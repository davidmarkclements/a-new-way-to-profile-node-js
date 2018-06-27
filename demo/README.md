# Bubbleprof Example

This is an example of a small real world-ish program. It contains an import script (`import-npm.js`) that imports the npm registry metadata into a mongodb running on localhost and a series of servers showcasing problems and improvements.

The mongodb will contain two collections `slow` and `fast` which contain the same data, except `fast` will contain an index for doing fast lookups and `slow` will not.

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

To run the first one do:

```sh
clinic bubbleprof --on-port 'autocannon localhost:$PORT -c 100 -d 5' -- node 1.js
```
