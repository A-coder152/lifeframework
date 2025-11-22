const bigTasksDiv = document.getElementById("bigTasksDiv")
const newTaskInput = document.getElementById("newTaskInput")
const newTaskBtn = document.getElementById("newTaskBtn")
const splitTasksDiv = document.getElementById("splitTasksDiv")
const splitTasksBtn = document.getElementById("splitTasksBtn")

newTaskBtn.addEventListener("click", () => {
    const newBigTask = document.createElement("div")
    newBigTask.innerHTML = `
    <h4>${newTaskInput.value}</h4>
    <p>woah look its a new task</p>`
    newBigTask.classList.add("bigTask")
    bigTasksDiv.appendChild(newBigTask)
})

splitTasksBtn.addEventListener("click", () => {
    const newSplitTask = document.createElement("div")
    newSplitTask.innerHTML = `
    <h5> split task title </h5>
    <p> split task description </p>`
    splitTasksDiv.appendChild(newSplitTask)
})