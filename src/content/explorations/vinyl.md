---
title: "Vinyl Player"
date: "2025-06-07" 
description: "A fully functioning vinyl player built in framer."
coverImage: "https://res.cloudinary.com/barthkosi/image/upload/vinyl-player-cover.webp"
bannerImage: ""
author: "Barth"
tags: ["Framer"]
buttonText: "View Live"
buttonLink: "https://vinylplayer.framer.website/"
---

![](https://res.cloudinary.com/barthkosi/image/upload/vinyl-player.webp)

### Exploration

Inspired by the tactile music cards from [mymind](https://mymind.com/), I wanted to see if I could push Framer beyond static visuals. While the original inspiration uses a hover effect to reveal the record, I was curious about Framer's native audio support and wanted to build a version that actually played music.

![](https://res.cloudinary.com/barthkosi/image/upload/my-mind-vinyl.webp)

### Implementation

To achieve this, I built a two-state system: a static base and an active playback variant. Tapping the play button triggers Framer’s native audio component while simultaneously swapping to the active state, which initiates a linear rotation loop for the vinyl. To maintain the physical "card" aesthetic, the component uses a fixed 222px width, ensuring the layout remains consistent across all viewports.

![](https://res.cloudinary.com/barthkosi/image/upload/vinyl-framer-setup.webp)

![](https://res.cloudinary.com/barthkosi/video/upload/vinyl-demo.webm)

### Future State

In the coming weeks, I intend to expand this into a curated audio space where the cover art updates dynamically based on my current listening behaviour, also serving as an archive for my personal playlists.