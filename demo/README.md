# Bubbleprof Example

This is an example of a small real world-ish program. It contains an import script (`import-npm.js`) that imports the npm registry metadata into a mongodb running on localhost and a series of servers showcasing problems and improvements.

The mongodb will contain two collections `slow` and `fast` which contain the same data, except `fast` will contain an index for doing fast lookups and `slow` will not.

## Setup

If you have docker installed you can install and run a mongo container by doing.

```sh
docker pull mongo
docker run -it -p 27017:27017 mongo
```

Then to import some data

```sh
# note you can just run this for a bit and kill it
node import-npm.js
```

## Demo steps

First of all, let's establish a baseline (the starting point from which
we will optimize). On one terminal:

```
node 1.js
````

In another:

```
autocannon localhost:$PORT -c 2 -d 5
```

This will give us a baseline, and it should be kind of slow (2 req/s on
a Macbook)! So we run doctor:

```
clinic doctor --on-port 'autocannon localhost:$PORT -c 2 -d 5' -- node 1.js
```

Doctor reports that we have an I/O issue. Show that the recommendations
points to running bubbleprof. So, we run bubbleprof:

```
clinic bubble --on-port 'autocannon localhost:$PORT -c 2 -d 5' -- node 1.js
```

On the left, there is the asynchoruns operation diagram, and relative
number. Highlight that we have only a few asynchronous operations
running, and that the big spikes happens when one of these finishes.

The yellow-colored line is from Mongo, this has a time of about 5s.
Click through, and it divies in two trunks.
Clicking on each line opens the line the stack frames panel,
and show that there is a line number in our application that triggered
this slow operation. Open the file and show the line. It is a problem
with a MongoDB query!

Execute:

```
$ mongo
> use 
> db.getCollection('modules').find().sort({modified: -1}).limit(5)
{ "_id" : "dinossauro", "seq" : 2233374, "version" : "0.0.7", "modified" : "2017-06-12T12:46:37.328Z" }
{ "_id" : "marin-vue-chat", "seq" : 2233365, "version" : "1.0.0", "modified" : "2017-06-12T12:45:34.103Z" }
{ "_id" : "react-kwik-jss", "seq" : 2233324, "version" : "1.0.0-beta.2", "modified" : "2017-06-12T12:43:38.035Z" }
{ "_id" : "smarty-koubei", "seq" : 2233314, "version" : "1.0.0", "modified" : "2017-06-12T12:43:29.788Z" }
{ "_id" : "rodal-on-animation-end", "seq" : 2233290, "version" : "1.5.3", "modified" : "2017-06-12T12:40:48.591Z" }
> db.getCollection('modules').find().sort({modified: -1}).limit(5).explain()
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "npm.modules",
                "indexFilterSet" : false,
                "parsedQuery" : {

                },
                "winningPlan" : {
                        "stage" : "SORT",
                        "sortPattern" : {
                                "modified" : -1
                        },
                        "limitAmount" : 5,
                        "inputStage" : {
                                "stage" : "SORT_KEY_GENERATOR",
                                "inputStage" : {
                                        "stage" : "COLLSCAN",
                                        "direction" : "forward"
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "4a0b25008465",
                "port" : 27017,
                "version" : "3.6.5",
                "gitVersion" : "a20ecd3e3a174162052ff99913bc2ca9a839d618"
        },
        "ok" : 1
}
```

Note that MongoDB is performing a _full sort_ of all the modules in npm
**for every request**. By pure chance there is another collection in the
database:

```
> db.getCollection('modulesIndexed').find().sort({modified: -1}).limit(5).explain()
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "npm.modulesIndexed",
                "indexFilterSet" : false,
                "parsedQuery" : {

                },
                "winningPlan" : {
                        "stage" : "LIMIT",
                        "limitAmount" : 5,
                        "inputStage" : {
                                "stage" : "FETCH",
                                "inputStage" : {
                                        "stage" : "IXSCAN",
                                        "keyPattern" : {
                                                "modified" : 1
                                        },
                                        "indexName" : "modified_1",
                                        "isMultiKey" : false,
                                        "multiKeyPaths" : {
                                                "modified" : [ ]
                                        },
                                        "isUnique" : false,
                                        "isSparse" : false,
                                        "isPartial" : false,
                                        "indexVersion" : 2,
                                        "direction" : "backward",
                                        "indexBounds" : {
                                                "modified" : [
                                                        "[MaxKey, MinKey]"
                                                ]
                                        }
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "4a0b25008465",
                "port" : 27017,
                "version" : "3.6.5",
                "gitVersion" : "a20ecd3e3a174162052ff99913bc2ca9a839d618"
        },
        "ok" : 1
}
```

Then, show that `2.js` use that new collection.
Verify that the I/O bottleneck has been resolved.
On one terminal


```
node 2.js
````

In another:

```
autocannon localhost:$PORT -c 2 -d 5
```

req/s grew significantly, but they are still below expectations. Maybe
it is because only 2 connections are used. Let's ramp it up to 100.


```
autocannon localhost:$PORT -c 100 -d 5
```

As the performance is still below expectations, we can use doctor again:

```
clinic doctor --on-port 'autocannon localhost:$PORT -c 100 -d 5' -- node 2.js
```

Doctor now indicates that we now have a blocking event loop issue, and
it recommends to use clinic flame:

```
clinic flame --on-port 'autocannon localhost:$PORT -c 100 -d 5' -- node 2.js
```

In the flamegraph, the `computeMagic`  function is the bottleneck.
Looking at `2.js` it is evident that the `computeMagic`  is not really
useful. We can remove it and check our benchmark.

On one terminal:


```
node 3.js
````

In another:

```
autocannon localhost:$PORT -c 100 -d 5
```

Results have improved! Let's verify if `clinic doctor` have name
suggestions for us:


```
clinic doctor --on-port 'autocannon localhost:$PORT -c 100 -d 5' -- node 3.js
```

Our application is healthy under the given load!
