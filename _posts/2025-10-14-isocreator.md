---
layout: post
title: Building IsoCreator
date: 2025-10-14
description: Creating a C# tool for ISO creation
tags: PS2-Development C# ISO
categories: Game-Development
---
So there I was with a full converted PlayStation 2 project in hand and ready to run. Executing it as an ELF file was fine, but I'm trying not to settle for fine. Wouldn't it be nice if it were packaged as an ISO file?

#### Why not use a Proprietary Tool?
Umm, no. Not because it won't get the job done. I'm opposed to the idea of using paid software for what should be a simple and straightforward task. So I guess I'll build it myself.

#### Building the App
So as a proof of concept, I started out with building a console app. It relied on the DiscUtils.Iso9660 package to handle ISO creation. It received two parameters: (1) the folder containing the files to include in the image, and (2) the location and filename of the resulting image.

It worked!

#### ISO Generation
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

#### Creating a GUI application
So this works, and would be fine for my uses. The vast majority of users on Windows would prefer some kind of GUI, so that was the next target. Implementing the same functionality in a windowed interface, away from the scary black screen.

So I set up a new project in Visual Studio, using the "Windows Forms App (.NET Framework)" example project. The default Form1.cs file was deleted, and everything was defined with the Program.cs file. The window looks as follows:

{% include figure.liquid loading="eager" path="assets/img/isocreator_win1.png" class="img-fluid rounded z-depth-1" zoomable=true %}

#### Next Steps
- General UX improvements
- Show folder statistics
- Add Volume Name field
- Show Folder on complete
- Emoji Icons
- Improved logging
- Cancel button during ISO creation.