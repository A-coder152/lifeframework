const bigTasksDiv = document.getElementById("bigTasksDiv")
const newTaskInput = document.getElementById("newTaskInput")
const newTaskBtn = document.getElementById("newTaskBtn")
const splitTasksDiv = document.getElementById("splitTasksDiv")
const splitTasksBtn = document.getElementById("splitTasksBtn")

let expandoList = []

function toggleExpand(expando){
    expandoList[expando].style.display = (expandoList[expando].style.display == "flex")? "none": "flex"
}

newTaskBtn.addEventListener("click", () => {
    const newBigTask = document.createElement("div")
    const expansion = document.createElement("textarea")
    expansion.placeholder = "Add notes/description..."
    expansion.style.display = "none"
    expansion.classList.add("expansionInput")
    newBigTask.innerHTML = `
    <div class="horiz">
    <h4>${newTaskInput.value}</h4>
    <button class="toggleButton" onclick="toggleExpand(${expandoList.push(expansion) - 1})"></button>
    </div>`
    newBigTask.classList.add("bigTask")
    newBigTask.appendChild(expansion)
    bigTasksDiv.appendChild(newBigTask)
})

splitTasksBtn.addEventListener("click", () => {
    const newSplitTask = document.createElement("div")
    const expansion = document.createElement("p")
    expansion.textContent = "notes/description"
    expansion.style.display = "none"
    expansion.classList.add("expansionP")
    newSplitTask.innerHTML = `
    <div class="horiz">
    <h4>split task title</h4>
    <button class="toggleButton" onclick="toggleExpand(${expandoList.push(expansion) - 1})"></button>
    </div>`
    newSplitTask.classList.add("splitTask")
    newSplitTask.appendChild(expansion)
    splitTasksDiv.appendChild(newSplitTask)
})