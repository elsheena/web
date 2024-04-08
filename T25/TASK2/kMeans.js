import { activeMode, data_points } from "./main.js";

import {
    calculateDistance,
    showOldPoints
} from "./canvas_handler.js";

import {
    disableButtons,
    enableButtons
} from "./buttons_handler.js";

import {
    checkingOnError,
    deepCopy,
    getRandomInt
} from "./func_for_algo.js";

import { Point } from "./Objects.js";

export { startkMeans };



export let count_clusters;

function startkMeans() {
    count_clusters = Number(document.getElementById('getClusters').value);

    if (!checkingOnError(count_clusters)) {
        showOldPoints();
        disableButtons();

        kMeans(deepCopy(data_points));
        enableButtons();
    }
}

function kMeans(points) {
    let centroids = [];
    points = findFirstCentroids(deepCopy(points), centroids) //create array the first centroids

    let counter = 0;
    while (counter < 100) {
        assignPointsToCluster(points, centroids.slice());

        centroids = calculateNewPositionClusters(points.slice(), centroids.slice());
        counter++;
    }
}

function findFirstCentroids(points, centroids) {
    let ind = getRandomInt(0, points.length);
    points[ind].cluster = 1;
    centroids[0] = Copy(points[ind]);
    centroids[0].draw();

    for (let i = 0; i < count_clusters - 1; i++) {
        let ind_next_centr;
        if (i == 0) {
            let max_dist = 0;

            for (let j = 0; j < points.length; j++) {
                let d = calculateDistance(centroids[i].x, centroids[i].y, points[j].x, points[j].y);

                if (d > max_dist && isCanCentroids(points[j], centroids)) {
                    max_dist = d;
                    ind_next_centr = j;
                }

            }
            points[ind_next_centr].cluster = i + 2;
            centroids[i + 1] = Copy(points[ind_next_centr]);
            centroids[i + 1].draw();

        } else {
            let sum_max_dist = 0;
            for (let j = 0; j < points.length; j++) {
                let s = 0;
                for (let k = 0; k < centroids.length; k++) {
                    let d = calculateDistance(centroids[k].x, centroids[k].y, points[j].x, points[j].y);
                    s += d;
                }

                if (sum_max_dist < s && isCanCentroids(points[j], centroids)) {
                    sum_max_dist = s;
                    ind_next_centr = j;
                }
            }

            points[ind_next_centr].cluster = i + 2;
            centroids[i + 1] = Copy(points[ind_next_centr]);
            centroids[i + 1].draw();

        }
    }

    return points;
}

function assignPointsToCluster(points, centroids) {
    for (let i = 0; i < points.length; i++) {
        let min_dist = Infinity;
        let num_clust;
        for (let j = 0; j < centroids.length; j++) {
            let tmp = calculateDistance(points[i].x, points[i].y, centroids[j].x, centroids[j].y);
            if (min_dist > tmp) {
                min_dist = tmp;
                num_clust = centroids[j].cluster;
            }
        }

        if (points[i].cluster !== num_clust) {
            points[i].cluster = num_clust;
            points[i].draw();
        }
    }
}

function calculateNewPositionClusters(points, centroids) {
    let centroids_new = centroids.slice();
    let SumX = [],
        SumY = [],
        count = [];

    for (let i = 0; i < count_clusters; i++) {
        SumX.push(0);
        SumY.push(0);
        count.push(0);
    }

    for (let i = 0; i < points.length; i++) {
        SumX[points[i].cluster - 1] += points[i].x;
        SumY[points[i].cluster - 1] += points[i].y;
        count[points[i].cluster - 1]++;
    }

    for (let i = 0; i < centroids_new.length; i++) {
        centroids_new[i].x = SumX[i] / count[i];
        centroids_new[i].y = SumY[i] / count[i];
    }

    return centroids_new;
}

function isCanCentroids(point, centroids) {
    for (let i = 0; i < centroids.length; i++) {
        if (centroids[i].x == point.x & centroids[i].y == point.y) {
            return false;
        }
    }

    return true;
}

function Copy(obj) {
    return new Point(obj.x, obj.y, obj.cluster);
}