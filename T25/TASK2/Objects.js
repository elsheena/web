import { POINT_RADIUS } from "./main.js";
import { ctx } from "./main.js";

export {
    colors,
    Point
}


class Point {
    constructor(x, y, cluster) {
        this.x = x;
        this.y = y;
        this.cluster = cluster;
        this.core = false; //Definition of the main or noise point (DBSCAN)
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, POINT_RADIUS, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = colors[this.cluster];
        ctx.fill();
    }

    redraw(color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, POINT_RADIUS, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
}

const colors = [
    'rgb(0, 0 ,0)',
    'rgb(0, 0 ,150)',
    'red',
    'rgb(0, 100 ,0)',
    'rgb(0, 100 ,100)',
    'rgb(0, 100 ,200)',
    'rgb(0, 200 ,0)',
    'rgb(0, 200 ,100)',
    'rgb(0, 200 ,200)',
    'rgb(100, 0 ,0)',
    'rgb(100, 0 ,100)',
    'rgb(100, 0 ,200)',
    'rgb(100, 100 ,0)',
    'rgb(100, 100 ,100)',
    'rgb(100, 100 ,200)',
    'rgb(100, 200 ,0)',
    'rgb(100, 200 ,100)',
    'rgb(100, 200 ,200)',
    'rgb(200, 0 ,0)',
    'rgb(200, 0 ,100)',
    'rgb(200, 0 ,200)',
    'rgb(200, 100 ,0)',
    'rgb(200, 100 ,100)',
    'rgb(200, 100 ,200)',
    'rgb(200, 200 ,0)',
    'rgb(200, 200 ,100)',
    'rgb(200, 200 ,200)',
    'rgb(210, 220 ,250)'
];