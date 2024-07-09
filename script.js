const gridContainer = document.querySelector("#grid-container");
const changeGridBtn = document.querySelector("#change-grid-btn");


const createGrid = (size) => {
    gridContainer.innerHTML = "";
    gridContainer.style.setProperty("--size", size);

    for(let i = 0; i < size * size; i++) {
        let div = document.createElement("div");
        gridContainer.appendChild(div);
        div.classList.add("small-div");
    }

    

}

changeGridBtn.addEventListener("click", () => {
    let gridSize = parseInt(prompt("ENTER SIZE BETWEEN 16 AND 100", 64));

    if (!gridSize || gridSize < 16 || gridSize > 100) {
        alert("Please enter a number between 16 and 100");
        return;
    }
    createGrid(gridSize);
})
