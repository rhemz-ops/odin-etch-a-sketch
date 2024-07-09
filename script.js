const gridContainer = document.querySelector("#grid-container");
const changeGridBtn = document.querySelector("#change-grid-btn");

let gridSize;

changeGridBtn.addEventListener("click", () => {
    gridSize = prompt("ENTER SIZE OF GRID THAT YOU WANT", 64);
    createGrid(gridSize);
})

const createGrid = (size) => {
    for(let i = 0; i < size; i++) {
        let div = document.createElement("div");
        gridContainer.appendChild(div);
        div.classList.add("small-div");

    }


}
