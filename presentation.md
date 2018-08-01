title: A new way to profile Node.js
layout: true
class: no-counter
<!-- This slide will serve as the base layout for all your slides -->
.bottom-bar[
  <a style="float:left;filter:invert(.5)" href="http://nearform.com"><img src="nearform.svg" alt="nearForm" height="32"></a>
  <div style='float:right;margin-top:.6em;letter-spacing:.03em'>
    <div style='font-size:0.6em;line-height:1.1em'>
      <a href=https://twitter.com/davidmarkclem>
        <span class=em>@</span>davidmarkclem
      </a>
    </div>
  </div>
]

---
class: splash
<p style='margin-top:-1em'></p>
# &nbsp;&thinsp;A .em[NEW] WAY <br>TO PROFILE<br> NODE.em[.]JS

<span>David Mark Clements</span>
<a style="border-top:2px solid #d13787;filter:invert(.125);display:block;width:10em;margin-left:auto;margin-right:auto;padding-top:.4em;margin-top:1.3em;margin-bottom:-2.5em" href="http://nearform.com"><img src="nearform.svg" alt="nearForm" height="52"></a>

---
class: impact

# .blink-2[🚨]
## .blink-1[MAXIMUM NUMBER OF SERVERS] 
## .blink-1[SALES TRAFFIC DROPPING]
## .blink-1[ANGRY PEOPLE ARE ANGRY]

---

class: impact

# Why is it slow?

<p style='padding: .1em'></p>
.col-5[
## The bottleneck is .em[internal]
<br>
## The Node.js process
## is on fire
]

.col-2[
## .center[|]
## .center[|]
## .center[|]
## .center[|]
## .center[|]
]

.col-5[
## The bottleneck is .em[external]
<br>
## Something else
## is on fire
]

---

class: impact

# .em[Where] is the bottleneck?

---

# Finding Bottlenecks

.center[.responsive-v[![](opt-process.png)]]


---

# Simulating Load

<div class=logo style='background:rgb(127,127,127);margin-bottom:-1em;height:3.9em;margin-top:0.95em;border: 2px solid #d13787;box-sizing:border-box'>
  .autocannon[![](autocannon.png)]
</div>


.responsive[![](autocannon-demo.gif)]

---

# Finding Bottlenecks

.center[.responsive-v[![](opt-process-diagnostics.png)]]

---

# Diagnostics

[.throb[.center[![](clinic.png)]]](http://github.com/nearform/node-clinic)


```sh
$ npm install -g clinic
```

---

<a href=http://github.com/nearform/node-clinic style="position:absolute;left:0;top:.5em;width:100%;">
.center[.clinic[![](clinic.png)]] 
</a>
<p style="margin-top: 5.5em"></p>


.col-4[
<a href=http://github.com/nearform/node-clinic-doctor>
.logo[![](doctor.png)]
## Clinic Doctor 
</a>
]

.col-4[
<span>
.logo[![](bp.png)] 
## Clinic Bubbleprof 
</span>
]

.col-4[
<a href=http://github.com/davidmarkclements/0x>
.logo[![](flame.png)]
## Clinic Flame 
</a>
]


---

class: impact

# Clinic Doctor
<a href=http://github.com/nearform/node-clinic-doctor>
.logo[![](doctor.png)]
</a>

## Collects metrics by .em[injecting probes]
## Assesses health with .em[heuristics]
## Creates .em[recommendations]

---

class: impact

# Clinic Flame
.logo[![](flame.png)]
## Collects metrics by .em[CPU sampling]
## Tracks .em[top-of-stack] frequency
## Creates .em[flame graphs]

---

class: impact

# Clinic Bubbleprof

.logo[![](bp.png)]

## Collects metrics using .em[async_hooks]
## Tracks .em[latency] between operations
## Creates .em[bubble graphs]

---

class: impact

# .em[Live] Hack

.col-4[
<a href=http://github.com/nearform/node-clinic-doctor>
.logo[![](doctor.png)]
</a>
]

.col-4[
<span>
.logo[![](bp.png)] 
</span>
]

.col-4[
<a href=http://github.com/davidmarkclements/0x>
.logo[![](flame.png)]
</a>
]
.col-12[
  <p style="margin-top:1em"></p>
  ## .em[Interact:] <u><http://nf.ie/interact></u>
]

---

.center[
  ![](shaggy.gif)
]


---

class: impact

<h1 style='margin-top:-0.25em'>The .em[Team]</h1>

.team[![](clinic-team.jpg)]

---
class: splash

# Thanks y.em[']all.em[!] 
## [.em[@]davidmarkclem](https://twitter.com/davidmarkclem)
<span>David Mark Clements</span>

<p style="margin-top:2em"></p>

.center[
  <h3 style='color:white;margin-bottom:0.1em'>.em[Feedback] welcome</h3>
  #### <u><https://nf.ie/BPFB></u>
]


<a style="filter:invert(.125);display:block;width:10em;margin-left:auto;margin-right:auto;padding-top:.8em;margin-top:1.7em;margin-bottom:-2.5em" href="http://nearform.com"><img src="nearform.svg" alt="nearForm" height="52"></a>
