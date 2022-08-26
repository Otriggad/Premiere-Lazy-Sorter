# Lazy Sorter for Premiere Pro
### Automatically sorts items into desired bins based on file format

### DISCLAIMER this is a proof of concept widget. Use at own risk. Save project progress before sort

![Lazy Sorter Demo](https://i.imgur.com/50DcsYz.gif)


---

### Installation 
1. [Download alpha release ZXP](https://github.com/Otriggad/Premiere-Lazy-Sorter/releases/download/v0.1-alpha-preview/lazy-sorter-preview-release_v0.1.zxp)
2. Install with recommended [ZXP installer](https://aescripts.com/learn/zxp-installer/)



### Config file

The config.txt file can be modified to your liking and is stored in `~/Documents/LazySort/config.txt`

Each line holds 3 segments: The bin name, included extensions for said bin and desired labelcolor for said bin. Each segment is seperated by symbol `"|"`. The extension list is seperated by `" "` (spaces).

`Bin name|List of extensions to be sorted into bin|label enumerator according to Premiere label color setup`

### Example config

```
01 Video|.mp4 .mov .avi|1
02 Audio|.mp3 .wav|2
03 Images|.bmp .jpg .png|3
03 Sequences|$SEQ|4
```
Sequences/Nests can be sorted using string `$SEQ`


### Attribution
Code is largely based on assets from https://github.com/NTProductions
