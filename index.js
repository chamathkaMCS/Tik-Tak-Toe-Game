const restart = document.getElementById("restartBtn");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusContainer");
const winConditions = [
  [0, 1, 2, 1],
  [3, 4, 5, 2],
  [6, 7, 8, 3],
  [0, 3, 6, 4],
  [1, 4, 7, 5],
  [2, 5, 8, 6],
  [0, 4, 8, 7],
  [2, 4, 6, 8],
];
let CellTemplate = ["","","","","","","","",""];
let currentPlayer = "X"
let running = false;
let crossLine = 0;
startGame()


function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellCliked));
    restart.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellCliked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (CellTemplate[cellIndex] != "" || !running) {
        return;
    }
    else {
        updateCell(this, cellIndex);
        console.log(CellTemplate);
        checkWinner();
    }
    
}
function restartGame() {
    currentPlayer = (currentPlayer == "X") ? "X" : "O";
    CellTemplate = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    const lines = document.querySelectorAll("[lineNumber]");
    lines.forEach((line) => {
      line.style.display = "none";
    });
    running = true;
}
function updateCell(cell,Index) {
    CellTemplate[Index] = currentPlayer;
    cell.textContent = currentPlayer;
    console.log(cell);
}
function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    // if (currentPlayer = "O") {
    //     let emptyIndexes = [];
    //     CellTemplate.forEach((value, index) => {
    //         if (value === "") {
    //             emptyIndexes.push(index);
    //         }
    //     });
    //     const AIfill = emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
    //     cells.forEach((cell) => cell.querySelectorAll("cellIndex", AIfill));
    //     updateCell(cells.cellIndex, AIfill);
    //     console.log(cells.cellIndex,AIfill);
    //     currentPlayer ="X";
        
    // }
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
    let winnerSelected = false;

    for (let i = 0; i < winConditions.length; i++){
        const cellvalue = winConditions[i];
        const cellA = CellTemplate[cellvalue[0]];
        const cellB = CellTemplate[cellvalue[1]];
        const cellC = CellTemplate[cellvalue[2]];
        crossLine = cellvalue[3];
        

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            winnerSelected = true;
            break;
        }
    }

    if (winnerSelected) {
        statusText.textContent = `${currentPlayer} Wins..!`;
        console.log(crossLine);
        const line = document.querySelector(`[lineNumber="${crossLine}"]`);
        if (line) {
          line.style.display = "block";
        }
        running = false;
    } else if (!CellTemplate.includes("")) {
        statusText.textContent = `Draw..!`;
        running = false;
    } else {
        changePlayer();
    }
}