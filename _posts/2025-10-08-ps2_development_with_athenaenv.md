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



#### ISO Generation

#### Testing on PC (Emulation)

#### First Test Case - 2048


#### Next Steps

I can run the ELF files as is on console/emulator, but to fully scratch the itch I'd like to create ISO files for each game. While solutions exist (e.g. proprietary image burning software or using unix tools through the Windows Subsystem for Linux), I'm not too happy with those options. I guess the next step is building a small console app to help with that.

I need to have a lot more practice playing around with this platform before I can even entertain the idea of building something from scratch. For now I'll focus more on converting already made games to run on this.