

const gridContainer = document.querySelector("#grid-container");
const changeGridBtn = document.querySelector("#change-grid-btn");
const randomBtn = document.querySelector("#random-btn");
const colorPicker = document.querySelector("#color-picker");
const lightenBtn = document.querySelector("#lighten-btn")
const eraseBtn = document.querySelector("#erase-btn");
const clearBtn = document.querySelector("#clear-btn");

let isDrawing = false;
let isRandomMode = false;
let isEraseMode = false;

colorPicker.addEventListener("click", () => {
    isEraseMode = false;
    isRandomMode = false;
})

randomBtn.addEventListener("click", () => {
    randomMode();
})

eraseBtn.addEventListener('click', () => {
    eraseMode();
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
    return `rgb(${red}, ${green}, ${blue})`;
}

const createGrid = (size) => {
    gridContainer.innerHTML = "";
    gridContainer.style.setProperty("--size", size);

    for(let i = 0; i < size * size; i++) {
        let div = document.createElement("div");
        gridContainer.appendChild(div);
        div.classList.add("small-div");

        div.addEventListener("mousedown", () => {
            isDrawing = true;
            draw(div);
        });

        div.addEventListener("mousemove", () => {
            if(isDrawing) {
                draw(div);
            }
        })

        div.addEventListener("mouseup", () => {
            isDrawing = false;
        })

        /* div.addEventListener("mouseleave", () => {
            if(isDrawing) {
                draw(div);
            }
        }) */

        document.addEventListener("mouseup", () => {
            isDrawing = false;
        })

        clearBtn.addEventListener("click", () => {
            const smallDivs = document.querySelectorAll(".small-div");
            smallDivs.forEach(element => {
                element.style.backgroundColor = "transparent";
            })
        })
    }

}

const draw = div => {
    if(!isEraseMode && !isRandomMode) {
        div.style.backgroundColor = colorPicker.value;
    } else if (isEraseMode && !isRandomMode) {
        div.style.backgroundColor = "transparent";
    } else if (!isEraseMode && isRandomMode) {
        div.style.backgroundColor = randomMode();
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
