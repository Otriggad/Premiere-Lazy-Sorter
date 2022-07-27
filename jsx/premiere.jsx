#include "json2.js"

//ARRAY MANIPULATION STUB
Array.prototype.indexOf = function (item) {
    var index = 0,
        length = this.length;
    for (; index < length; index++) {
        if (this[index] === item)
            return index;
    }
    return -1;
};

//GLOBAL ARRAYS and FLaGS
var extensions = []
var binNames = []
var rootBins = []
var binLabels = []

//DEBUG
$.writeln("...................")

//Opens directory of config.txt in finder/explorer
function openConfigDir() {
    var cfgPATH = "~/Documents/LazySort/"
    cfgDir = new Folder(cfgPATH)
    cfgDir.execute();
}

//Loads config from file
function loadConfig() {
    //Create config if it doesn't exist
    var cfgPATH = "~/Documents/LazySort/"
    var cfgDir = new Folder(cfgPATH);
    if (!cfgDir.exists) {
        $.writeln(cfgDir.fsName.toString())
        cfgDir.create();
    }
    if (File(cfgDir.fsName + "/config.txt").exists) {
        $.writeln("config exists already")
    } else {
        //Create Default Config,txt
        $.writeln("Creating Default Config")
        var cfgFile = new File(cfgDir.fsName + "/config.txt")
        cfgFile.open('w')
        cfgFile.write('01 Media|.mov .avi .mp4 .m4v|0\n02 Audio|.mp3 .wav|1\n03 Gfx|.jpg .png .psd .gif|2')
        cfgFile.close();
    }
    //Read config
    var cfgFile = File(cfgDir.fsName + "/config.txt")
    cfgFile.open("r")
    while (!cfgFile.eof) {
        line = cfgFile.readln()
        split = line.split("|")
        binNames.push(split[0])
        binExts = split[1].split(" ")
        //DEBUG
        $.writeln("binExts: " + binExts.type)
        extensions.push(binExts)
        binLabels.push(split[2])
    }
    cfgFile.close()
    //DEBUG
    $.writeln(binNames)
    $.writeln(extensions)
    $.writeln("config.txt loaded")
}

//Returns projectItem if bin with name exists already
function binExistsInRoot(name) {
    for (var j = 0; j < app.project.rootItem.children.numItems; j++) {
        if (app.project.rootItem.children[j].name == name && app.project.rootItem.children[j].type == 2) {
            return app.project.rootItem.children[j]
        }
    }
    return null
}

//Moves items into bin and conforms moved items if conformflag = true
function moveToFolder(items, bin, conformLabelColors) {
    binLabel = parseInt(bin.getColorLabel())
    for (var i = 0; i < items.length; i++) {
        if (conformLabelColors == true) {
            items[i].setColorLabel(binLabel)
        }
        items[i].moveBin(bin);
    }
}

//Main function
function lazySort(conformFlag) {
    $.writeln("in lazy sort")
    var projectRoot = app.project.rootItem

    for (var i = 0; i < binNames.length; i++) {
        if (binExistsInRoot(binNames[i])) {
            //Don't create new bin
            rootBins.push(binExistsInRoot(binNames[i]))
        } else {
            rootBins.push(projectRoot.createBin(binNames[i]))
        }
    }
    for (var k = 0; k < binNames.length; k++) {
        var itemsToMove = []
        for (var i = 0; i < projectRoot.children.numItems; i++) {
            currentItemName = projectRoot.children[i].name

            // XML VERSION
            // var text = new XML(app.project.activeSequence.videoTracks[0].clips[0].projectItem.getProjectMetadata());
            // //$.writeln(text.toString())
            // var info = text.child(0).child(0).child('premierePrivateProjectMetaData:Column.Intrinsic.MediaType');
            // alert(info.toString())

            currentItemExt = currentItemName.substring(currentItemName.length - 4, currentItemName.length).toLowerCase()
            $.writeln((extensions[k][0]).toString() + " " + currentItemExt)
            $.writeln("EXT0: " + extensions[0])
            if (projectRoot.children[i].isSequence() && extensions[k] == "$SEQ") {
                itemsToMove.push(projectRoot.children[i])
            }
            //if(extensions[k].indexOf(currentItemExt) >= 0) {
            else if (extensions[k].indexOf(currentItemExt) >= 0) {
                //$.writeln(extensions[k])
                itemsToMove.push(projectRoot.children[i])
            }

        }

        if (conformFlag) {
            rootBins[k].setColorLabel(parseInt(binLabels[k]))
        }
        moveToFolder(itemsToMove, rootBins[k], conformFlag);
    }
}