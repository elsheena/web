const COLUMNS_SIZE = 101 // number of columns in the maze
const ROWS_SIZE = 101 // number of rows in the maze
const FIELD_SIZE = 7 // the size of the cell in the maze
const PADDING = 10 // frame (padding inside the canvas)
const TRACTORS_NUMBER = 20 // number of tractors that should be on the field

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const map = generatMaze(COLUMNS_SIZE, ROWS_SIZE, TRACTORS_NUMBER)

// starting position (we will search on mouse click)
let startPosition = null
// final position (we will search on mouse click)
let finishPosition = null

init()
start()

// the function initially registers the tick() function in requestAnimationFrame
function start () {
	// requestAnimationFrame() allows you to register a function that will be called before the screen is updated
	requestAnimationFrame(tick)
	/*
         the function takes arguments (which DOM element to watch,
         function_which takes a mouse argument and can be manipulated with this argument)
    */
	mouseWatcher(canvas, function (mouse) {
		if (mouse.x <= PADDING
			|| mouse.y <= PADDING
			|| mouse.x >= canvas.width - PADDING
			|| mouse.y >= canvas.height - PADDING
		) {
			return
		}

		const coordinats = {
			x: parseInt((mouse.x - PADDING) / FIELD_SIZE),
			y: parseInt((mouse.y - PADDING) / FIELD_SIZE)
		}

		console.log(coordinats)

		// the cell the mouse is currently over is considered
        // if the cell is not a wall, then let this cell be the finish position
        // otherwise, the last actual finish position will remain the final position
		if (getField(coordinats.x, coordinats.y) === 'space') {
			finishPosition = coordinats
		}
	})
}

      /*
           the tick() function accepts a timestamp because it is called with requestAnimationFrame
           timestamp - number of milliseconds since opening, page refresh
     */
function tick (timestamp) {
	clearCanvas()
	drawMap()

	// If start and end points are defined, look for path
	if (startPosition && finishPosition) {
		const way = getWay(map, startPosition, finishPosition)
		// console.log(way)
		drawWay(way)
	}

	requestAnimationFrame(tick)
}

// function initializes start data
function init () {
	// размеры канваса
	canvas.width = PADDING * 2 + COLUMNS_SIZE * FIELD_SIZE
	canvas.height = PADDING * 2 + ROWS_SIZE * FIELD_SIZE
  /*
     by clicking on the maze we will determine the starting position of the path
     starting position coordinates will be determined by matching
     with the coordinates of the finishing position
  */
	canvas.addEventListener('click', function (event) {
		if (finishPosition) {
			startPosition = {
				x: finishPosition.x,
				y: finishPosition.y
			}
		}
	})
}

// function draws the map
function drawMap () {
	for (let x = 0; x < COLUMNS_SIZE; x++) {
		for (let y = 0; y < ROWS_SIZE; y++) {
			if (getField(x, y) === 'wall') {
				context.fillStyle = 'black'
				context.beginPath()
				context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
				context.fill()
			}
		}
	}
}

// the function draws the path from the start cell to the end
function drawWay (way) {
	// since each cell is essentially an array with x, y coordinates,
    // then they can be immediately taken into the variable [x, y] in the loop
	for (const [x, y] of way) {
		context.fillStyle = 'red'
		context.beginPath()
		context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
		context.fill()
	}
}

// function clears the canvas
function clearCanvas () {
	// A frame is created here (a black box, then draw a white one inside)
    // what color to fill
	context.fillStyle = 'black'
	// create a new elementary geometric shape
	context.beginPath()
	// rectangle (upper left corner, rectangle width and height)
	context.rect(0, 0, canvas.width, canvas.height)
	// fill the shape with the selected fill color
	context.fill()

	// this creates a white box inside the frame
	context.fillStyle = 'white'
	context.beginPath()
	context.rect(PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2)
	context.fill()
}

// get value from matrix
function getField (x, y) {
	if (x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE) {
		return null
	}

	return map[y][x]
}

// write value to matrix
function setField (x, y, value) {
	if (x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE) {
		return null
	}

	map[y][x] = value
}
