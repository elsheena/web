import { updateCtx, updateExtraCtxForMainObjects, updateExtraCtxForPheromones } from "./draw.js";
import { initAnts, initMainObjects, initPheromones, reset } from "./inits.js";
import { vars } from "./vars.js";

window.addEventListener("load", function onWindowLoad() {

    //                   DUVAR VE YİYECEK                   
    initMainObjects();

    //                FEROMONLAR                
    initPheromones();

    //                      SÜRÜCÜ EKLE!!!                      
    let myAudio = document.getElementById("myAudioId");

    myAudio.onended = function() {
        myAudio.currentTime = 0;
        myAudio.play();
    }

    let driveButton = document.getElementById("driveId");
    driveButton.onclick = function() {
        if (!vars.driveMode) {
            myAudio.autoplay = true;
            myAudio.play();
            vars.driveMode = true;
            driveButton.textContent = "Enough";
            document.getElementById("wave1").style.display = "flex";
            document.getElementById("wave2").style.display = "flex";
            document.getElementById("wave3").style.display = "flex";
        } else {
            myAudio.currentTime = 0;
            myAudio.pause();
            vars.driveMode = false;
            driveButton.textContent = "More!";
            document.getElementById("wave1").style.display = "none";
            document.getElementById("wave2").style.display = "none";
            document.getElementById("wave3").style.display = "none";
        }
    };

    //                     MODAL PENCERE DÜĞMELERİ                     

    //              AYARLAR              
    document.getElementById("showSettingsModalWindow").onclick = function() {
        window.location.href = '#shadowSettings'
        vars.modalWindowMode = true;
        document.getElementById("colonyInputId").value = vars.antsNumber;
        document.getElementById("colonyOutputId").value = vars.antsNumber;
        document.getElementById("antsEyesRadiusInputId").value = vars.radiusOfAntsEyes;
        document.getElementById("antsEyesRadiusOutputId").value = vars.radiusOfAntsEyes;
        document.getElementById("mapPheromoneScaleInputId").value = vars.mapPheromoneScale;
        document.getElementById("mapPixelScaleInputId").value = vars.mapPixelScale;
    };
    document.getElementById("closeSettingsModalWindow").onclick = function() {
        window.location.href = '#';
        vars.modalWindowMode = false;
    };
    document.getElementById("saveSettings").onclick = function() {
        window.location.href = '#';
        vars.modalWindowMode = false;
        vars.antsNumber = Number(document.getElementById("colonyInputId").value);
        vars.radiusOfAntsEyes = Number(document.getElementById("antsEyesRadiusInputId").value);
        vars.mapPheromoneScale = Number(document.getElementById("mapPheromoneScaleInputId").value);
        vars.mapPixelScale = Number(document.getElementById("mapPixelScaleInputId").value);
        vars.mainObjects = new Array(vars.MyCanvas.width / vars.mapPixelScale);
        vars.pheromones = new Array(vars.MyCanvas.width / vars.mapPheromoneScale);
        initMainObjects();
        initPheromones();
        reset();
    }


    //              GRAFİKLER              
    document.getElementById("showGraphicsModalWindow").onclick = function() {
        window.location.href = '#shadowGraphics'
        vars.modalWindowMode = true;
        document.getElementById("antsColorId").value = vars.antsColor;
        document.getElementById("anthillColorId").value = vars.anthill.color;
        document.getElementById("antsRadiusInputId").value = vars.antsRadius;
        document.getElementById("antsRadiusOutputId").value = vars.antsRadius;
        document.getElementById("pheromonesDrawingModeInputId").value = vars.pheromonesDrawingMode;
        document.getElementById("pheromonesDrawingModeOutputId").value = vars.pheromonesDrawingMode;
        document.getElementById("howOftenToUpdateColorInputId").value = vars.howOftenToUpdateColor;
        document.getElementById("howOftenToUpdateColorOutputId").value = vars.howOftenToUpdateColor;
    };
    document.getElementById("closeGraphicsModalWindow").onclick = function() {
        window.location.href = '#';
        vars.modalWindowMode = false;
    };
    document.getElementById("saveGraphics").onclick = function() {
        window.location.href = '#';
        vars.modalWindowMode = false;
        vars.antsColor = document.getElementById("antsColorId").value;
        vars.anthill.color = document.getElementById("anthillColorId").value;
        vars.antsRadius = Number(document.getElementById("antsRadiusInputId").value);
        vars.pheromonesDrawingMode = Number(document.getElementById("pheromonesDrawingModeInputId").value);
        vars.howOftenToUpdateColor = Number(document.getElementById("howOftenToUpdateColorInputId").value);
        vars.somethingChanged = true;
    }


    //                  TUŞ BASIM İŞLEYİCİLERİ                   
    let clearButton = document.getElementById("clear");
    let foodButton = document.getElementById("food");
    let wallsButton = document.getElementById("walls");
    let antsButton = document.getElementById("ants");
    let eraseButton = document.getElementById("erase");

    let brushWidth = document.getElementById("brushWidth");

    let drawingMode = new Array(4); //0 - yiyecek, 1 - duvarlar, 2 - karıncalar, 3 - silgi


    clearButton.onclick = reset;

    foodButton.onclick = function() {
        drawingMode[0] = true;
        drawingMode[1] = false;
        drawingMode[2] = false;
        drawingMode[3] = false;
    }
    wallsButton.onclick = function() {
        drawingMode[0] = false;
        drawingMode[1] = true;
        drawingMode[2] = false;
        drawingMode[3] = false;
    }
    antsButton.onclick = function() {
        drawingMode[0] = false;
        drawingMode[1] = false;
        drawingMode[2] = true;
        drawingMode[3] = false;
    }
    eraseButton.onclick = function() {
        drawingMode[0] = false;
        drawingMode[1] = false;
        drawingMode[2] = false;
        drawingMode[3] = true;
    }

    vars.MyCanvas.onmousemove = function(e) {
        if (e.buttons > 0 && e.offsetX >= 0 && e.offsetY >= 0 && e.offsetX <= vars.MyCanvas.width && e.offsetY <= vars.MyCanvas.height) {
            if (drawingMode[0]) {

                //YİYECEK!!!
                let x = Math.floor(e.offsetX / vars.mapPixelScale);
                let y = Math.floor(e.offsetY / vars.mapPixelScale);

                let width = brushWidth.value;

                for (let i = Math.max(0, x - Math.floor(width / vars.mapPixelScale)); i < Math.min(vars.MyCanvas.width / vars.mapPixelScale, x + Math.floor(width / vars.mapPixelScale)); i++) {
                    for (let j = Math.max(0, y - Math.floor(width / vars.mapPixelScale)); j < Math.min(vars.MyCanvas.height / vars.mapPixelScale, y + Math.floor(width / vars.mapPixelScale)); j++) {
                        if (!vars.mainObjects[i][j].wall) {
                            vars.mainObjects[i][j].food = Math.min(255, vars.mainObjects[i][j].food + 6);
                            vars.mainObjects[i][j].notEmpty = true;
                        }
                    }
                }
                vars.somethingChanged = true;

            } else if (drawingMode[1]) {

                //DUVAR!!!
                let x = Math.floor(e.offsetX / vars.mapPixelScale);
                let y = Math.floor(e.offsetY / vars.mapPixelScale);

                let width = brushWidth.value;

                for (let i = Math.max(0, x - Math.floor(width / vars.mapPixelScale)); i < Math.min(vars.MyCanvas.width / vars.mapPixelScale, x + Math.floor(width / vars.mapPixelScale)); i++) {
                    for (let j = Math.max(0, y - Math.floor(width / vars.mapPixelScale)); j < Math.min(vars.MyCanvas.height / vars.mapPixelScale, y + Math.floor(width / vars.mapPixelScale)); j++) {
                        vars.mainObjects[i][j].wall = true;
                        vars.mainObjects[i][j].food = 0;
                        vars.mainObjects[i][j].toFoodPheromones = 0;
                        vars.mainObjects[i][j].toHomePheromones = 0;
                        vars.mainObjects[i][j].notEmpty = true;
                    }
                }
                vars.somethingChanged = true;

            } else if (drawingMode[3]) {

                //SİLGİ!!!
                let x = Math.floor(e.offsetX / vars.mapPixelScale);
                let y = Math.floor(e.offsetY / vars.mapPixelScale);

                let width = brushWidth.value;

                for (let i = Math.max(0, x - Math.floor(width / vars.mapPixelScale)); i < Math.min(vars.MyCanvas.width / vars.mapPixelScale, x + Math.floor(width / vars.mapPixelScale)); i++) {
                    for (let j = Math.max(0, y - Math.floor(width / vars.mapPixelScale)); j < Math.min(vars.MyCanvas.height / vars.mapPixelScale, y + Math.floor(width / vars.mapPixelScale)); j++) {
                        if (i !== 0 && j !== 0 && i !== vars.mainObjects.length - 1 && j !== vars.mainObjects[0].length - 1) {
                            vars.mainObjects[i][j].notEmpty = false;
                            vars.mainObjects[i][j].wall = false;
                            vars.mainObjects[i][j].food = 0;
                        }
                    }
                }
                vars.somethingChanged = true;
            }
        }
    };


    vars.MyCanvas.onmousedown = function(e) {
        if (drawingMode[2]) {

            //KOLONİ OLUŞTUR!!!
            if (!vars.anthill.isBuilt && e.offsetX > vars.anthill.radius * 2 && e.offsetY > vars.anthill.radius * 2 && e.offsetX < vars.MyCanvas.width - vars.anthill.radius * 2 && e.offsetY < vars.MyCanvas.height - vars.anthill.radius * 2) {
                vars.anthill.isBuilt = true;
                vars.anthill.x = e.offsetX;
                vars.anthill.y = e.offsetY;

                //  KARINCALAR  
                initAnts();
                vars.somethingChanged = true;
            }
        }
    }

    //ÇİZİM VE HESAPLAMA
    let it = 0;
    setInterval(function() {
        if (!vars.modalWindowMode) {

            //SÜRÜCÜ MODUNDA RENKLEME)))
            if (vars.driveMode && it % vars.howOftenToUpdateColor === 0) {
                if (vars.antsColor >= "#eeeeee") {
                    vars.antsColorIsGrowing = false;
                } else if (vars.antsColor <= "#111111") {
                    vars.antsColorIsGrowing = true;
                }
                if (vars.antsColorIsGrowing)
                    vars.antsColor = '#' + (parseInt(vars.antsColor.slice(1, 7), 16) + 74565).toString(16);
                else
                    vars.antsColor = '#' + (parseInt(vars.antsColor.slice(1, 7), 16) - 74565).toString(16);
            }

            it = (it + 1) % 10000000;

            if (vars.somethingChanged)
                updateExtraCtxForMainObjects();
            vars.somethingChanged = false;

            if (it % vars.howOftenToRedrawPheromones === 0)
                updateExtraCtxForPheromones();

            updateCtx();
        }
    }, 0);
});