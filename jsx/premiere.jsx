#include "json2.js"

var extensions = []
var binNames = []
var binContent = []
var rootBins = []
var binLabels = []


function openConfigDir() {
    var cfgPATH = "~/Documents/LazySort/"
    cfgDir = new Folder(cfgPATH)
    cfgDir.execute();
}


function loadConfig() {
    //Delimiter = |

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
        $.writeln("creating default config")
        var cfgFile = new File(cfgDir.fsName + "/config.txt")
        cfgFile.open('w')
        cfgFile.write('01 Media|.mov .avi .mp4 .m4v\n02 Audio|.mp3 .wav\n03 GFX|.jpg .png .psd .gif')
        cfgFile.close();
    }
    ///////
    
    var cfgFile = File(cfgDir.fsName + "/config.txt")
    cfgFile.open("r")
    while(!cfgFile.eof) {
        line = cfgFile.readln()
        split = line.split("|")
        binNames.push(split[0])
        binExts = split[1].split(" ")
        extensions.push(binExts)
        binLabels.push(split[2])
    
    }
    cfgFile.close()
    $.writeln(binNames)
    $.writeln(extensions[0])
    $.writeln("config loaded")
}

function binExistsInRoot(name) {
    //var projectRoot = app.project.rootItem
   
    for (var j = 0; j < app.project.rootItem.children.numItems; j++) {
        //$.writeln("Name: "+ name)
        //$.writeln("prjitemName: "+  app.project.rootItem.children[j].name )
       
        if (app.project.rootItem.children[j].name == name && app.project.rootItem.children[j].type == 2) {
            return app.project.rootItem.children[j]
        } 
    }
    return null
}

function moveToFolder(items, bin, conformLabelColors) {
    binLabel = parseInt(bin.getColorLabel())
    for(var i = 0; i < items.length; i++) {
        if (conformLabelColors == true) {
            items[i].setColorLabel(binLabel)
        }
        items[i].moveBin(bin);
        }
    }
function lazySort() {
    $.writeln("in lazy sort")
    var projectRoot = app.project.rootItem

    for(var i = 0; i < binNames.length; i++) {
        if(binExistsInRoot(binNames[i])) {
            //Don't create new bin
            rootBins.push(binExistsInRoot(binNames[i]))
        } else {
            rootBins.push(projectRoot.createBin(binNames[i]))
        }
    }
    for(var k = 0; k < binNames.length; k++) {
        var itemsToMove = []
        for (var i = 0; i < projectRoot.children.numItems; i++) {
            currentItemName = projectRoot.children[i].name

            // XML VERSION
            // var text = new XML(app.project.activeSequence.videoTracks[0].clips[0].projectItem.getProjectMetadata());
            // //$.writeln(text.toString())
            // var info = text.child(0).child(0).child('premierePrivateProjectMetaData:Column.Intrinsic.MediaType');
            // alert(info.toString())

            if (projectRoot.children[i].isSequence() && extensions[k] == "$SEQ" ) {
                itemsToMove.push(projectRoot.children[i])
            }         
        
            currentItemExt = currentItemName.substring(currentItemName.length-4,currentItemName.length).toLowerCase()  
            if(extensions[k].indexOf(currentItemExt) >= 0) {
                $.writeln(extensions[k])
                itemsToMove.push(projectRoot.children[i])
            }

        }
        
        rootBins[k].setColorLabel(parseInt(binLabels[k]))
        moveToFolder(itemsToMove, rootBins[k], true);
    }
}