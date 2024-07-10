

const gridContainer = document.querySelector("#grid-container");
const changeGridBtn = document.querySelector("#change-grid-btn");
const randomBtn = document.querySelector("#random-btn");
const colorPicker = document.querySelector("#color-picker");
const eraseBtn = document.querySelector("#erase-btn");
const clearBtn = document.querySelector("#clear-btn");


let isEraseMode = false;
let isRandomMode = false;


colorPicker.addEventListener("click", () => {
    isEraseMode = false;
})

eraseBtn.addEventListener('click', () => {
    eraseMode();
})

randomBtn.addEventListener("click", () => {
    randomMode();
})


const eraseMode = () => {
    isEraseMode = true;
}

const randomMode = () => {
    isEraseMode = false;
    isRandomMode = true;
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue});`;
}

console.log(randomMode());

const createGrid = (size) => {
    gridContainer.innerHTML = "";
    gridContainer.style.setProperty("--size", size);

    for(let i = 0; i < size * size; i++) {
        let div = document.createElement("div");
        gridContainer.appendChild(div);
        div.classList.add("small-div");
        div.addEventListener('click', () => {
            if(!isEraseMode && !isRandomMode) {
                div.style.backgroundColor = colorPicker.value;
            } else if (isEraseMode && !isRandomMode) {
                div.style.backgroundColor = "transparent";
            } else if (!isEraseMode && isRandomMode) {
                div.style.backgroundColor = randomMode();
            }
            
        })
        clearBtn.addEventListener("click", () => {
            const smallDivs = document.querySelectorAll(".small-div");
            smallDivs.forEach(element => {
                element.style.backgroundColor = "transparent";
            })
        })
    }

}

changeGridBtn.addEventListener("click", () => {
    isEraseMode = true;
    let gridSize = parseInt(prompt("ENTER SIZE BETWEEN 16 AND 100", 64));

    if (!gridSize || gridSize < 16 || gridSize > 100) {
        alert("Please enter a number between 16 and 100");
        return;
    }
    createGrid(gridSize);
})

createGrid(16);
