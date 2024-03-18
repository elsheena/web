const canvas = document.getElementById('canvas');
    const gridSize = 20;
    const grid = [];
    let startNode = null;
    let endNode = null;
    
    function createGrid() {
      for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
          const cell = document.createElement('div');
          cell.className = 'square';
          cell.addEventListener('click', () => toggleWall(cell));
          row.push(cell);
          canvas.appendChild(cell);
        }
        grid.push(row);
      }
    }
    
    function toggleWall(cell) {
      if (cell === startNode || cell === endNode) return;
      cell.classList.toggle('wall');
    }
    
    function clearCanvas() {
      grid.forEach(row => {
        row.forEach(cell => {
          cell.className = 'square';
        });
      });
      startNode = null;
      endNode = null;
    }
    
    function findPath() {
      // Implement A* algorithm to find the shortest path (to be done)
    }
    
    // function resetCanvas() {
    //   clearCanvas();  Not needed
    //   createGrid();
    // }
    
    createGrid();
