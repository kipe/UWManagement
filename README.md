# UWManagement

A small kwinscript developed for own use. Meant for usage with 3440x1440 display,
although also supports 1920x1080 as I still use one as a secondary display (behaviour alters a bit).

## Idea
The main idea is to divide the 3440x1440 to six slots, roughly presented below.

```
  860         1720         860
----------------------------------
|       |                |       |
|       |                |       | 720
|       |                |       |
----------------------------------
|       |                |       |
|       |                |       | 720
|       |                |       |
----------------------------------
```

The script adds the following shortcuts to achieve this layout:
  - Meta+Q -> window to top-left
  - Meta+S -> window to left (full height)
  - Meta+Z -> window to bottom-left
  - Meta+W -> window to top-middle
  - Meta+S -> window to middle (full height)
  - Meta+X -> window to bottom-middle
  - Meta+E -> window to top-right
  - Meta+D -> window to right (full height)
  - Meta+C -> window to bottom-right

For a 2x2 grid (the previous shortcuts work like this on display widths <1920px):
  - Meta+Shift+Q -> window to top-left
  - Meta+Shift+S -> window to left (full height)
  - Meta+Shift+Z -> window to bottom-left
  - Meta+Shift+W -> window to top (full width)
  - Meta+Shift+S -> window to full screen
  - Meta+Shift+X -> window to bottom (full width)
  - Meta+Shift+E -> window to top-right
  - Meta+Shift+D -> window to right (full height)
  - Meta+Shift+C -> window to bottom-right

## Installation
Just run `build_and_update.sh` and you should be set.

## Acknowledgments
The idea for this script (and many examples of window moving etc) came from the
excellent [UltrawideWindows](https://github.com/LucaMoschella/UltrawideWindows)
by [LucaMoschella](https://github.com/LucaMoschella).

The reason for creating my own script instead of modifying and pull-requesting
to UltawideWindows was mainly that I just wanted a bit different layout and
learn how to create kwinscripts.
