---
layout: post
title: Building IsoCreator
date: 2025-10-14
description: Building a C# utility for PlayStation 2 ISO creation
tags: CSharp ISO Tooling
categories: Game-Development
---

So there I was with a full converted PlayStation 2 project in hand and ready to run. Executing it as an ELF file was fine, but I'm trying not to settle for fine. Wouldn't it be nice if it were packaged as an ISO file?

## Why not use a proprietary tool?

I could have used existing paid tools and moved on. Instead, I wanted a lightweight approach I could automate, customize, and share. That pushed me toward building a small utility myself.

## Building the app

As a proof of concept, I started with a console app using `DiscUtils.Iso9660` for ISO creation. It accepts two parameters:

- Source folder to include in the image
- Output path and filename for the generated ISO

It worked!

## ISO generation

```c#
private async Task CreateIsoImageAsync(string sourceFolder, string outputIso)
{
    await Task.Run(() =>
    {
        // Create the ISO builder
        CDBuilder builder = new CDBuilder();
        builder.UseJoliet = true;
        builder.VolumeIdentifier = Path.GetFileName(sourceFolder);

        // Count total files first for progress tracking
        UpdateStatus("Scanning files...");
        int totalFiles = CountFiles(sourceFolder);
        int processedFiles = 0;

        LogMessage($"Found {totalFiles} files to add");
        UpdateProgress(0);

        // Add files and folders recursively
        UpdateStatus("Adding files to ISO...");
        AddDirectory(builder, sourceFolder, "", ref processedFiles, totalFiles);

        // Build and write the ISO
        UpdateStatus("Building and writing ISO image...");
        UpdateProgress(95);

        using (FileStream isoStream = File.Create(outputIso))
        {
            builder.Build(isoStream);
        }

        UpdateProgress(100);
        UpdateStatus("ISO creation completed!");

        FileInfo fi = new FileInfo(outputIso);
        LogMessage($"ISO size: {FormatBytes(fi.Length)}");
    });
}
```

## Creating a GUI application

The console version was good enough for me, but most Windows users prefer a GUI. So the next step was wrapping the same core logic in a desktop interface.

I created a new Visual Studio project using "Windows Forms App (.NET Framework)", removed the default `Form1.cs`, and defined the UI from `Program.cs`.

Current UI:

{% include figure.liquid loading="eager" path="assets/img/isocreator_win1.png" class="img-fluid rounded z-depth-1" zoomable=false %}

## What I learned

- A small CLI proof of concept is the fastest way to validate core logic.
- Separating ISO build logic from the UI makes iteration much easier.
- Good progress reporting matters as much as raw feature completeness in desktop tools.

## Next Steps

- Add a volume name field and validation
- Show source folder stats before build (file count and total size)
- Add a cancel button for long-running operations
- Improve progress and logging clarity
- Add "Open output folder" on completion
- Package a portable release with usage docs
