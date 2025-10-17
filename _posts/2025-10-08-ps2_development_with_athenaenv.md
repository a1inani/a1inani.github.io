---
layout: post
title: PS2 Development with AthenaEnv
date: 2025-10-08
description: Getting Started in PS2 Development
tags: PS2-Development AthenaEnv
categories: Game-Development
---

For the better part of a year, I've been enamoured by the idea of doing full on game development. About a decade ago I tinkered around in Unity (and Blender), under the guidance of a YouTube playlist. I built one simple game and my interest ended there. A couple of years later, I got my hands on a Phat PAL PS2 (enter model number here) and a FreeMcBoot memory card. This got me thinking, what if I gave PS2 game development a try? What is it like to write game code that runs on bare metal? No operating system or hypervisor to run on top of.

So I set out in search of the PS2 SDK and stumbled upon a preconfigured Docker container (ps2dev/ps2dev). I searched for a tutorial on YouTube and I was off to the races, writing C++ code for the first time in quite a while. I didn't get too far along in this process, and frankly I didn't know what was going on most of the time, so I shelved it a couple of weeks in.

By chance, I saw a YouTube video that described the process of converting a web-based game (written in JavaScript) to run on a PS2 relying on the AthenaEnv platform. This got me longing to give PS2 development a shot once more, this time without having to worry about the complexity of C++ development. So here we are.

#### What is AthenaEnv?

<a href="https://github.com/DanielSant0s/AthenaEnv">AthenaEnv</a> is a project that allows for the development of homebrew software for the PlayStation 2 using JavaScript. In essence, it provides an abstration layer (implementing several interfaces to key system calls). The main advantage it has over bare metal programming is that it allows you to iterate quickly, not having to compile. Just rerun the ELF file after making changes to your JavaScript code, and there you are. Fast and simple!

AthenaEnv uses a slightly modified version of the QuickJS interpreter for JavaScript. So at its core, AthenaEnv is basically a JavaScript loader. It runs "main.js" by default, but it can run other files by passing it as the first argument when launching the ELF file.

Enough about that for now, lets begin setting up to write some basic code!

#### Setting up the project
To get started, all I needed to dp was download the default template from the AthenaEnv GitHub repository linked above. For the purpose of testing,, I also installed the <a href="https://pcsx2.net/downloads/">PCSX2</a> emulator. This comes in handy for quick testing, removing the need to boot up the PlayStation 2 every time I need to test a new build. Other guides online will better describe the setup guide, so I won't spend any time talking about that.

#### First Test Case - 2048
As a test case, I figured I'd scratch a second itch and take a look at the code generation capabilities of <a href="https://claude.ai">Claude</a>. So I pointed it to the GitHub repository holding the JavaScript 2048 game I picked as the test case (<a href="https://github.com/gd4Ark/2048">link</a>), the AthenaEnv repository, and basically told it to port that code to that platform. Below is what the web game looks like in a browser:

{% include figure.liquid loading="eager" path="assets/img/2048.png" class="img-fluid rounded z-depth-1" zoomable=true %}

Now the initial version wasn't the best, but after fiddling with it a bit, I got it to look like this:

{% include figure.liquid loading="eager" path="assets/img/2048-ps2.png" class="img-fluid rounded z-depth-1" zoomable=true %}

I still need to do a bit of testing on it, I'm not sure if it is a key binding issue on my emulator but I'm struggling to get the game to begin in initial tests. I will then have to a couple of tests on device before I am happy sharing an ISO version. 

#### Next Steps

I can run the ELF files as is on console/emulator, but to fully scratch the itch I'd like to create ISO files for each game. While solutions exist (e.g. proprietary image burning software or using unix tools through the Windows Subsystem for Linux), I'm not too happy with those options. I guess the next step is building a small console app to help with that.

I need to have a lot more practice playing around with this platform before I can even entertain the idea of building something from scratch. For now I'll focus more on converting already made games to run on this.