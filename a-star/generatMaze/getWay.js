// the function returns an array of all points that make up the path from the first selected point to the second selected point
function getWay (map, startPosition, finishPosition) {
	/*
In JS, arrays and objects are reference entities.
In order not to create a random data mutation, we will create a copy of the map object
*/
	map = JSON.parse(JSON.stringify(map))

	/*
Wherever on the map the passage is "space", we put infinity
In JS, infinity is represented by the number Infinity
*/
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (getField(x, y) === 'space') {
				setField(x, y, Infinity)
			}
		}
	}

// Put the number 0 in the starting position
	setField(startPosition.x, startPosition.y, 0)

	/*
You need to line up in numerical order all those steps
to be done,
to get to the last cell
*/

/*
Let's go through all the elements of the array and for all elements that have a number value, but not Infinity,
let's carry out a certain logic of spreading this value - it will be this value itself + 1
*/
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
		// value of the current element
			const value = getField(x, y)

// if the value of the element is a number, and its value is not Infinity,
// propagate this value to adjacent cells
			if (typeof value === 'number' && value !== Infinity) {
				if (x > 0 && typeof getField(x - 1, y) === 'number') {
                // set the minimum value between the values of the current element and neighboring
					const currentValue = getField(x - 1, y)
					setField(x - 1, y, Math.min(currentValue, value + 1))
				}

				if (x < map[y].length - 1 && typeof getField(x + 1, y) === 'number') {
					// set the minimum value between the values of the current element and neighboring
					const currentValue = getField(x + 1, y)
					setField(x + 1, y, Math.min(currentValue, value + 1))
				}
				// сверху
				if (y > 0 && typeof getField(x, y - 1) === 'number') {
					// set the minimum value between the values of the current element and neighboring
					const currentValue = getField(x, y - 1)
					setField(x, y - 1, Math.min(currentValue, value + 1))
				}
				// bottom
				if (y < map.length - 1 && typeof getField(x, y + 1) === 'number') {
					// set the minimum value between the values of the current element and neighboring
					const currentValue = getField(x, y + 1)
					setField(x, y + 1, Math.min(currentValue, value + 1))
				}
			}
		}
	}

	// repeat until we find the path from the start point to the end
	while (!isWay()) {
		/*
        Let's go through all the elements of the array and for all elements that have a number value, but not Infinity,
        let's carry out a certain logic of spreading this value - it will be this value itself + 1
        */
		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[y].length; x++) {
				// value of the current element
				const value = getField(x, y)

				// if the value of the element is a number, and its value is not Infinity,
                // propagate this value to adjacent cells
				if (typeof value === 'number' && value !== Infinity) {
					// left
					if (x > 0 && typeof getField(x - 1, y) === 'number') {
						const currentValue = getField(x - 1, y)
						// set the minimum value between the values of the current element and neighboring
						setField(x - 1, y, Math.min(currentValue, value + 1))
					}
					// on right
					if (x < map[y].length - 1 && typeof getField(x + 1, y) === 'number') {
						const currentValue = getField(x + 1, y)
						// set the minimum value between the values of the current element and neighboring
						setField(x + 1, y, Math.min(currentValue, value + 1))
					}
					// above
					if (y > 0 && typeof getField(x, y - 1) === 'number') {
						const currentValue = getField(x, y - 1)
						// set the minimum value between the values of the current element and neighboring
						setField(x, y - 1, Math.min(currentValue, value + 1))
					}
					// bottom
					if (y < map.length - 1 && typeof getField(x, y + 1) === 'number') {
						const currentValue = getField(x, y + 1)
						// set the minimum value between the values of the current element and neighboring
						setField(x, y + 1, Math.min(currentValue, value + 1))
					}
				}
			}
		}
	}

	// array of all elements that match our path
	const fields = []

	// finish
	const position = {
		x: finishPosition.x,
		y: finishPosition.y
	}

	fields.push([position.x, position.y])
	// number is the number that is written in the cell
	let number = getField(position.x, position.y) - 1

	/*
looking for a cell among those adjacent to the current cell,
the number in which is 1 less than in the "finish" cell
*/
	while (number > -1) {
		// left
		if (position.x > 0 && getField(position.x - 1, position.y) === number) {
			fields.push([position.x - 1, position.y])
			position.x--
		}
		// on right
		else if (position.x < map[0].length - 1 && getField(position.x + 1, position.y) === number) {
			fields.push([position.x + 1, position.y])
			position.x++
		}
		// above
		else if (position.y > 0 && getField(position.x, position.y - 1) === number) {
			fields.push([position.x, position.y - 1])
			position.y--
		}
		// bottom
		else if (position.y < map.length - 1 && getField(position.x, position.y + 1) === number) {
			fields.push([position.x, position.y + 1])
			position.y++
		}

		number--
	}
	
	// console.log(map)

	return fields

	// the function should only return true if a way out of the maze was found
	function isWay () {
		return getField(finishPosition.x, finishPosition.y) !== Infinity
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
}