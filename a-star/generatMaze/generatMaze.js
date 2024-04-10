// the function will build a maze (the construction process will not be visible on the screen)
function generatMaze (columnsNumber, rowsNumber, tractorsNumber = 1) {
	const map = []
// Tractors that will clear paths in the maze
	const tractors = []

	for (let y = 0; y < rowsNumber; y++) {
		const row = []

		for (let x = 0; x < columnsNumber; x++) {
			row.push('wall')
		}

		map.push(row)
	}

	const startX = getRandomFrom(Array(columnsNumber).fill(0).map((item, index) => index).filter(x => isEven(x)))
	const startY = getRandomFrom(Array(rowsNumber).fill(0).map((item, index) => index).filter(x => isEven(x)))

// create tractors
	for (let i = 0; i < tractorsNumber; i++) {
		tractors.push({ x: startX, y: startY })
	}

// make the cell in which the tractor initially stands empty
	setField(startX, startY, 'space')

	// if the maze isn't ready yet, draw the tractor and register the tick() function again
	while (!isMaze()) {
		moveTractors()
	}

	return map

// get value from matrix
	function getField (x, y) {
		if (x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
			return null
		}

		return map[y][x]
	}

// write value to matrix
	function setField (x, y, value) {
		if (x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
			return null
		}

		map[y][x] = value
	}

// the function returns a random element from the array passed to it
	function getRandomFrom (array) {
// get the index of the array element randomly
// the number will be in the range from 0 to the number of elements in the array - 1
		const index = Math.floor(Math.random() * array.length)
// return the array element with the received random index
		return array[index]
	}

/*
function checks if number is even or not
if it returns true - even
*/
	function isEven (n) {
		return n % 2 === 0
	}

// function checks if maze is ready or not
// returns true if the maze is ready, false if not yet
	function isMaze () {
		for (let x = 0; x < columnsNumber; x++) {
			for (let y = 0; y < rowsNumber; y++) {
				if (isEven(x) && isEven(y) && getField(x, y) === 'wall') {
					return false
				}
			}
		}

		return true
	}

/*
function makes the tractor move
the tractor must move 2 squares
if the second cell is with a wall, then you need to clear the first and second
*/
	function moveTractors () {
		for (const tractor of tractors) {
			// массив с возможными направлениями трактора
			const directs = []

			if (tractor.x > 0) {
				directs.push('left')
			}

			if (tractor.x < columnsNumber - 2) {
				directs.push('right')
			}

			if (tractor.y > 0) {
				directs.push('up')
			}

			if (tractor.y < rowsNumber - 2) {
				directs.push('down')
			}

// randomly choose which direction to go
			const direct = getRandomFrom(directs)

			switch (direct) {
				case 'left':
					if (getField(tractor.x - 2, tractor.y) === 'wall') {
						setField(tractor.x - 1, tractor.y, 'space')
						setField(tractor.x - 2, tractor.y, 'space')
					}
					tractor.x -= 2
					break
				case 'right':
					if (getField(tractor.x + 2, tractor.y) === 'wall') {
						setField(tractor.x + 1, tractor.y, 'space')
						setField(tractor.x + 2, tractor.y, 'space')
					}
					tractor.x += 2
					break
				case 'up':
					if (getField(tractor.x, tractor.y - 2) === 'wall') {
						setField(tractor.x, tractor.y - 1, 'space')
						setField(tractor.x, tractor.y - 2, 'space')
					}
					tractor.y -= 2
					break
				case 'down':
					if (getField(tractor.x, tractor.y + 2) === 'wall') {
						setField(tractor.x, tractor.y + 1, 'space')
						setField(tractor.x, tractor.y + 2, 'space')
					}
					tractor.y += 2
					break
			}
		}
	}
}