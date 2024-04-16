export class Variables {

    // ELEMENTLER
    MyCanvas = document.getElementById("myCanvas");
    ctx = this.MyCanvas.getContext('2d');
    ExtraCanvasForMainObjects = document.getElementById("extraCanvas1");
    extraCtxForMainObjects = this.ExtraCanvasForMainObjects.getContext('2d');
    ExtraCanvasForPheromones = document.getElementById("extraCanvas2");
    extraCtxForPheromones = this.ExtraCanvasForPheromones.getContext('2d');

    // EN ÖNEMLİ ŞEY!!! FPS'Yİ ARTIRMA İMKÂNI SAĞLAR!!!
    mapPixelScale = 10; // her i'inci piksel bir nesneyi saklar, diğerleri sadece görüntüdür
    mapPheromoneScale = 10; // aynı şey, ancak feromonlar için

    // MODAL PENCERE
    modalWindowMode = false; // false - açık değil, true - açık

    // SÜRÜCÜ
    driveMode = false;
    antsColorIsGrowing = true;
    howOftenToUpdateColor = 50;

    // KARINCA
    antsNumber = 300;
    antsRadius = 4;
    antStepLength = 1.5;
    firstStepLength = 2;
    radiusOfAntsEyes = 10;
    constForDistanceFromHome = 1000;
    antsColor = '#ff0000';
    ants = [];
    anthill = {
        isBuilt: false,
        radius: 20,
        x: -1,
        y: -1,
        color: '#ff4411',
        borderColor: '#161712'
    }

    // FEROMONLAR
    pheromonesRadius = 3;
    minPheromoneValue = 0.000001;
    minPheromoneValueForDrawing = 300;
    minDistanceToAnthill = 1;
    pheromonesDrawingMode = 0; // 1 - kalitatif çizim, 2 - nicel çizim
    pheromonesDecreasingCoefficient = 0.97;

    // NE KADAR SIKLIKLA
    howOftenToRedrawPheromones = 5;
    howOftenToUpdateAntsDirectionByPheromones = 10;
    howOftenToLeavePheromones = 5;
    howOftenToChooseGoodPath = 0.95;

    // ANA
    mainObjects;
    pheromones;
    somethingChanged = true; // arka planı sadece bir şey değiştiğinde yeniden çizin

    constructor() {
        this.mainObjects = new Array(this.MyCanvas.width / this.mapPixelScale);
        this.pheromones = new Array(this.MyCanvas.width / this.mapPheromoneScale);
    }
}

export const vars = new Variables();