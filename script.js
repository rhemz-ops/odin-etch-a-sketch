const gridContainer = document.querySelector("#grid-container");
const changeGridBtn = document.querySelector("#change-grid-btn");
const randomBtn = document.querySelector("#random-btn");
const colorPicker = document.querySelector("#color-picker");
const lightenBtn = document.querySelector("#lighten-btn");
const darkenBtn = document.querySelector("#darken-btn");
const eraseBtn = document.querySelector("#erase-btn");
const clearBtn = document.querySelector("#clear-btn");
const controlBtn = document.querySelectorAll(".mode-btn");

let isDrawing = false;

let oneColorMode = true;
let randomMode = false;
let lightenMode = false;
let darkenMode = false;
let eraseMode = false;

let activeButton = null;

controlBtn.forEach(btn => {
    btn.addEventListener('click', function() {
        if (activeButton) {
            activeButton.classList.remove('active');
        }
        this.classList.add('active');
        activeButton = this;
    })
})

const addCellListeners = (cell) => {
    // START DRAWING WHEN MOUSE IS DOWN
    cell.addEventListener("mousedown", () => {
        isDrawing = true;
        if (oneColorMode) {
            oneColor(cell);
        } else if (randomMode) {
            randomColor(cell);
        } else if (lightenMode) {
            lightenColor(cell);
        } else if (darkenMode) {
            darkenColor(cell);
        } else if (eraseMode) {
            eraseColor(cell);
        }
    })

    // KEEPS DRAWING WHEN MOUSE IS HELD
    cell.addEventListener('mouseover', () => {
        if (isDrawing) {
            if (oneColorMode) {
                oneColor(cell);
            } else if (randomMode) {
                randomColor(cell);
            } else if (lightenMode) {
                lightenColor(cell);
            } else if (darkenMode) {
                darkenColor(cell);
            } else if (eraseMode) {
                eraseColor(cell);
            }
        }
    })

    // STOPS DRAWING WHEN MOUSE IS RELEASED
    cell.addEventListener('mouseup', () => {
        isDrawing = false;
    })
}

colorPicker.addEventListener('click', () => {
    oneColorMode = true;
    randomMode = false;
    lightenMode = false;
    darkenMode = false;
    eraseMode = false;
})

randomBtn.addEventListener('click', () => {
    oneColorMode = false;
    randomMode = true;
    lightenMode = false;
    darkenMode = false;
    eraseMode = false;
})

lightenBtn.addEventListener('click', () => {
    oneColorMode = false;
    randomMode = false;
    lightenMode = true;
    darkenMode = false;
    eraseMode = false;
})

darkenBtn.addEventListener('click', () => {
    oneColorMode = false;
    randomMode = false;
    lightenMode = false;
    darkenMode = true;
    eraseMode = false;
})

eraseBtn.addEventListener('click', () => {
    oneColorMode = false;
    randomMode = false;
    lightenMode = false;
    darkenMode = false;
    eraseMode = true;
})

const oneColor = cell => {
    cell.style.backgroundColor = colorPicker.value;
}

const randomColor = cell => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

const lightenColor = cell => {
    let color = window.getComputedStyle(cell).backgroundColor;
    let rgb = color.match(/\d+/g);
    let red = Math.min(255, parseInt(rgb[0]) + 25.5);
    let green = Math.min(255, parseInt(rgb[1]) + 25.5);
    let blue = Math.min(255, parseInt(rgb[2]) + 25.5);
    cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

const darkenColor = cell => {
    let color = window.getComputedStyle(cell).backgroundColor;
    let rgb = color.match(/\d+/g);
    let red = Math.max(0, parseInt(rgb[0]) - 25.5);
    let green = Math.max(0, parseInt(rgb[1]) - 25.5);
    let blue = Math.max(0, parseInt(rgb[2]) - 25.5);
    cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

const eraseColor = cell => {
    cell.style.backgroundColor = 'transparent';
}

const clearGrid = (cell) => {
    cell.style.backgroundColor = 'transparent';
}

const changeGrid = size => {
    gridContainer.innerHTML = '';
    gridContainer.style.setProperty("--size", size);

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement('div');
        cell.classList.add("small-div");
        gridContainer.appendChild(cell);
        addCellListeners(cell);
        clearBtn.addEventListener('click', () => clearGrid(cell))
    }
}

changeGridBtn.addEventListener('click', () => {
    let gridSize = parseInt(prompt("ENTER SIZE THAT YOU WANT (1-100)", 16));

    if(gridSize < 2 || gridSize > 100 || !gridSize) {
        alert("PLEASE ENTER A NUMBER BETWEEN 2-100 ONLY");
        return;
    }

    changeGrid(gridSize);
});

changeGrid(16);
