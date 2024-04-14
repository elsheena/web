import { DEFAULT_FILL_COLOR } from "./main.js";
import { STROKE_WIDTH } from "./main.js";
import { VERTEX_RADIUS } from "./main.js";
import { ctx } from "./main.js";

export {
    Vertex,
    Chromosome
};


class Vertex {
    constructor(x, y, number) {
        this.x = x;
        this.y = y;
        this.number = number;
        this.color = DEFAULT_FILL_COLOR;
    }

    draw() {
        ctx.fillStyle = DEFAULT_FILL_COLOR;
        ctx.lineWidth = STROKE_WIDTH;

        ctx.beginPath();
        ctx.arc(this.x, this.y, VERTEX_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        this.drawNumber();
    }

    drawNumber() {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.font = 'bold ' + VERTEX_RADIUS + 'px sans-serif';

        ctx.beginPath();
        ctx.fillText(this.number, this.x, this.y);
        ctx.closePath();
    }
}

class Chromosome {
    constructor(chromosome, fitness) {
        this.chromosome = chromosome;
        this.fitness = fitness;
    }
}