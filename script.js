const bigTasksDiv = document.getElementById("bigTasksDiv")
const newTaskInput = document.getElementById("newTaskInput")
const newTaskBtn = document.getElementById("newTaskBtn")

newTaskBtn.addEventListener("click", () => {
    const newBigTask = document.createElement("div")
    newBigTask.innerHTML = `
    <h4>${newTaskInput.value}</h4>
    <p>woah look its a new task</p>`
    bigTasksDiv.appendChild(newBigTask)
})