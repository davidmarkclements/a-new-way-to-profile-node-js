title: Profiling Asynchronous Activity
layout: true
class: no-counter
<!-- This slide will serve as the base layout for all your slides -->
.bottom-bar[
  <a style="float:left;filter:invert(.5)" href="http://nearform.com"><img src="nearform.svg" alt="nearForm" height="32"></a>
  <div style='float:right'>
  <span>MC</span>
  <span class=em>&</span>
  <span>DMC</span>
  </div>
]

---
class: splash

# Profiling .em[Asynchronous] Activity
<span>Matteo Collina</span>
<span class=em> & </span>
<span>David Mark Clements</span>
<a style="border-top:2px solid #d13787;filter:invert(.125);display:block;width:10em;margin-left:auto;margin-right:auto;padding-top:.4em;margin-top:1.7em;margin-bottom:-2.5em" href="http://nearform.com"><img src="nearform.svg" alt="nearForm" height="52"></a>

---

class: impact

# Performance


---

class: impact

# Perf.em[r]omance

---

class: impact

# Don't it always seem to go...


---

class: impact

# That you don't know what you got

---

class: impact

# Till it's gone
---

class: impact

# .blink-2[🚨]
## .blink-1[MAXIMUM NUMBER OF SERVERS] 
## .blink-1[SALES TRAFFIC DROPPING]
## .blink-1[ANGRY PEOPLE ARE ANGRY]

---

class: impact

# Why is it slow?

---

class: impact

# Why is it slow?

<p style='padding: .1em'></p>
.col-5[
## Your Node.js process 
## is on .em[fire]
<br>
## The bottleneck is .em[internal]
]

.col-2[
## .center[|]
## .center[|]
## .center[|]
## .center[|]
## .center[|]
]

.col-5[
## It's .em[not]...
## something else is
<br>
## The bottleneck is .em[external]
]

---

class: impact

# .em[Where] is the bottleneck?

---

# Putting 🚀 back on 🐢 

* Reproduce the scenario on a production simulated environment 
* Reproduce on a synthetic local environment for rapid iteration
* Gather profiling data
* Analyse profiling data to find the bottleneck
* Mitigate the bottleneck
* Run the scenario on a patched production simulated environment to verify

---

# Putting 🚀 back on 🐢 

* Reproduce the scenario on a production simulated environment 
* Reproduce on a synthetic local environment for rapid iteration
* **.em[Gather profiling data]**
* **.em[Analyse profiling data to find the bottleneck]**
* Mitigate the bottleneck
* Run the scenario on a patched production simulated environment to verify

---

class: impact
<p style="margin-top:-2em"></p>
# Profiling Node.js
<p style="padding:.1em"></p>
.col-5[
## Clinic Flame
.logo[![](0x.png)]
## Identifies .em[internal] bottlenecks

]

.col-2[
## .center[|]
## .center[|]
## .center[|]
<code style="padding:.25em;position:absolute;margin-left:-4.5em;margin-top:-2.8em">
npm i -g clinic
</code>
## .center[|]
## .center[|]
]

.col-5[
## Clinic Bubbleprof
.logo[![](bp.png)]
## Identifies .em[external] bottlenecks
]

---

# Clinic Flame

.logo[![](0x.png)]

* Captures and aggregates call stacks via CPU sampling
* Identifies .em[hot] functions by tracking top-of-stack frequency
* Visualizes call stacks and function heat using a .em[Flamegraph] visualization
* Supports all platforms that Node runs on 
* The core of clinic flame is [0x](http://npm.im/0x)

---

class: impact

```sh
$ clinic flame -- node server.js
```


.logo[![](0x.png)]

## Diagnose an .em[internal bottleneck]
## by profiling .em[synchronous] activity
## using .em[Clinic Flame]

---

# Clinic Bubbleprof

.logo[![](bp.png)]

* Collects time spent waiting for callbacks to trigger using .em[async_hooks]
* Aggregates, groups and categorizes profiling data by operation and type and library 
* Visualizes how much asynchronous time libraries use and operational flow latency using a .em[Bubblegraph] visualization
* Supports all platforms that Node runs on 

---

class: impact


```sh
$ clinic bubble -- node server.js
```

.logo[![](bp.png)]

## Diagnose an .em[external bottleneck]
## by profiling .em[asynchronous] activity
## using .em[Clinic Bubbleprof]


---

.center[
  <img src=shaggy.gif>
]

# 🙌


---

class: impact

# Parting Words

---

# The high latency domino effect

* High CPU spikes .em[may] indicate an .em[external] bottleneck in high latency scenarios
* The event loop is a shared resource - I/O happens .em[concurrently] **not** on parallel threads
* High latency leads to a build up of I/O handles, which increases memory usage
* This puts the GC under pressure, which is forced to use more CPU cycles  

---

# Set quantifiable performance goals

> The application should have a response time of 200ms or less in the 99th percentile at 100 concurrent requests per server.


---

# Beware of the rabbit hole

* It is not uncommon for .em[80%] of effort to be in the final .em[20%] of optimization work
* Find out what .em[fast enough] is for your given business context
* Remember to .em[balance the cost] of your time against savings and other business gains

---

class: impact

<p style='margin-top:-2.25em'></p>

# .small[Choose fast libraries]

<p style='padding:.1em'></p>

.col-5[
## Pino
<a href='http://getpino.io'>
.logo[![](pino.png)]
</a>
## High speed .em[logging] library
]

.col-2[
## .center[|]
## .center[|]
## .center[|]
## .center[|]
## .center[|]
]

.col-5[
## Fastify
<a href='http://fastify.io'>
.logo[![](fastify.png)]
</a>
## High speed .em[web] framework
]


---
class: splash

# .em[Talk] to us!
## [.em[@]mcollina](https://twitter.com/mcollina) 
## [.em[@]davidmarkclem](https://twitter.com/davidmarkclem)
<span>Matteo Collina</span>
<span class=em> & </span>
<span>David Mark Clements</span>
<a style="filter:invert(.125);display:block;width:10em;margin-left:auto;margin-right:auto;padding-top:.8em;margin-top:3.2em;margin-bottom:-2.5em" href="http://nearform.com"><img src="nearform.svg" alt="nearForm" height="52"></a>
