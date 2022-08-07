# Lazy Sorter for Premiere Pro

![Lazy Sorter Demo](https://i.imgur.com/50DcsYz.gif)

### Automatically sort items in desired bins

---

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
Sequences/Nests can be sorted using string `$SEQ`. MOGRTS and After Effects Compositions can be referenced with `$MOGRT`
