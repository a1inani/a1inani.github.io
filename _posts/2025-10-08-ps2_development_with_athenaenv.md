---
layout: post
title: PS2 Development with AthenaEnv
date: 2025-10-08
description: Porting 2048 to PlayStation 2 with AthenaEnv
tags: PS2-Development AthenaEnv JavaScript
categories: Game-Development
---

For the better part of a year, I have been pulled toward game development. About a decade ago I tinkered with Unity (and Blender) through a YouTube playlist, built one small game, and stopped there. A couple of years later, I got my hands on a Phat PAL PS2 and a FreeMcBoot memory card.

That sparked a question: what is it like to write game code that runs close to the metal, without the usual modern runtime layers? I first explored the PS2 SDK through the `ps2dev/ps2dev` Docker image and some YouTube tutorials. I was writing C++ again after a long break, but I did not get far. I was mostly feeling my way through the toolchain, so I shelved it after a few weeks.

Later, I found a video showing how to port a web game (JavaScript) to PS2 using AthenaEnv. That felt like the right path back into PS2 homebrew for me, especially with faster iteration than a full C++ workflow.

## What is AthenaEnv?

<a href="https://github.com/DanielSant0s/AthenaEnv">AthenaEnv</a> is a framework for building PS2 homebrew software with JavaScript. It provides an abstraction layer over core system interfaces, which makes early experimentation much faster than starting directly from low-level C/C++.

AthenaEnv uses a modified QuickJS interpreter. At a high level, it acts as a JavaScript loader. It runs `main.js` by default, but you can pass another file as the first argument when launching the ELF.

Enough theory. Time to build.

## Setting up the project

To get started, I used the default template from <a href="https://github.com/JSLegendDev/Athena-PS2-Template">this repository</a>. For quick testing, I also installed the <a href="https://pcsx2.net/downloads/">PCSX2</a> emulator so I could iterate without booting real hardware for every run.

## First Test Case: 2048

As a test case, I wanted to evaluate how quickly I could get a browser game running on PS2. I used <a href="https://claude.ai">Claude</a> to assist with an initial port of this JavaScript 2048 project (<a href="https://github.com/gd4Ark/2048">repo</a>) to AthenaEnv.

Below is what the original game looks like in a browser:

{% include figure.liquid loading="eager" path="assets/img/2048.png" class="img-fluid rounded z-depth-1" zoomable=false %}

The first generated version was rough, but after a few iterations I got to this state:

{% include figure.liquid loading="eager" path="assets/img/2048-ps2.png" class="img-fluid rounded z-depth-1" zoomable=false %}

I still need to debug startup/input behavior. It might be a keybinding mismatch in the emulator. After that, I want to validate the same build on actual hardware before sharing an ISO.

## What I learned

- A JavaScript-first workflow lowers the barrier for PS2 experimentation.
- Emulator testing is great for iteration, but hardware validation still matters.
- LLM-assisted ports can accelerate first drafts, but manual debugging is still the real work.

## Next Steps

I can run ELF files on both console and emulator, but the end goal is packaging each project as an ISO. That means I need a clean Windows-first toolchain for image generation and testing.

I also need more reps on this platform before building a game from scratch. For now, I will keep porting small projects, documenting what breaks, and tightening the workflow.
