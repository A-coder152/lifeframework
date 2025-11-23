const bigTasksDiv = document.getElementById("bigTasksDiv")
const newTaskInput = document.getElementById("newTaskInput")
const newTaskBtn = document.getElementById("newTaskBtn")
const splitTasksDiv = document.getElementById("splitTasksDiv")
const splitTasksBtn = document.getElementById("splitTasksBtn")
const AIAwait = document.getElementById("AIAwait")

const task_bg_colors = ["rgb(229, 237, 255)", "rgb(255, 229, 229)", "rgb(255, 229, 251)",
    "rgb(255, 245, 229)", "rgb(255, 255, 229)", "rgb(232, 255, 229)", "rgb(229, 255, 255)"
]

let expandoList = []
let deletoBtns = []

async function api_request(url, stuff){
    const response = await fetch(url, stuff)
    if (!response.ok){
        throw new Error(`error ${response} code ${response.status} caused by request at ${url} for ${stuff}`)
    }
    return response.json()
}

async function ai_request(prompt){
    AIAwait.style.display = "flex"
    const response = await api_request("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", 
        {method: "POST", headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AIzaSyBg4IHRzXgfi2MpwNZ3vqE_4jkQ8Z1lHqQ"
        }, body: JSON.stringify({
            contents: [{parts: [{text: prompt}]}]
        })}
    )
    AIAwait.style.display = "none"
    return response.candidates?.[0]?.content?.parts?.[0]?.text || "no text :("
}

function toggleExpand(expando){
    expandoList[expando].style.display = (expandoList[expando].style.display == "flex")? "none": "flex"
}

function deleteParent(event){
    const button = event.target
    button.parentElement.parentElement.style.display = "none";
}

async function createSplitTasks(){
    const bigTasks = document.querySelectorAll(".bigTask")
    let taskDescs = []
    bigTasks.forEach(taskElement => {
        if (taskElement.style.display != "none"){
            taskDescs.push({
                name: taskElement.querySelector(".taskName").textContent,
                color: taskElement.style.backgroundColor,
                description: taskElement.querySelector(".expansionInput").value
        })}
    })
    const alreadySplit = document.querySelectorAll(".splitTask")
    let splitTaskDescs = []
    alreadySplit.forEach(taskElement => {
        splitTaskDescs.push({
            name: taskElement.querySelector(".taskName").textContent,
            color: taskElement.style.backgroundColor,
            description: taskElement.querySelector(".expansionP").value
        })
    })
    let splitTasks = await ai_request(`You are meant to help split the user's tasks.
        The user will provide a list of tasks, each with a name, color, and optional description.
        Your goal is to split these big tasks into smaller, step-by-step style to-dos.
        Return, in RAW JSON format, the split tasks, in a list. Do not use markdown formatting.
        Each split task should contain a name, color (which is the same as the parent color), and description.
        Do not return anything other than the JSON list.
        The user's tasks are as follows: ${JSON.stringify(taskDescs)}
        The user's existing split tasks are: ${JSON.stringify(splitTaskDescs)}`)
    splitTasks = JSON.parse(splitTasks)
    splitTasks.forEach(task => {
        const newSplitTask = document.createElement("div")
        const expansion = document.createElement("p")
        expansion.textContent = task.description
        expansion.style.display = "none"
        expansion.classList.add("expansionP")
        newSplitTask.innerHTML = `
        <div class="horiz">
        <h4 class="taskName">${task.name}</h4>
        <button class="toggleButton" onclick="toggleExpand(${expandoList.push(expansion) - 1})"></button>
        <button class="deletoBtn" onclick="deleteParent(event)">X</button>
        </div>`
        newSplitTask.classList.add("splitTask")
        newSplitTask.style.backgroundColor = task.color
        newSplitTask.appendChild(expansion)
        splitTasksDiv.appendChild(newSplitTask)
    })
}

newTaskBtn.addEventListener("click", () => {
    const newBigTask = document.createElement("div")
    const expansion = document.createElement("textarea")
    expansion.placeholder = "Add notes/description..."
    expansion.style.display = "none"
    expansion.classList.add("expansionInput")
    newBigTask.innerHTML = `
    <div class="horiz">
    <h3 class="taskName">${newTaskInput.value}</h3>
    <button class="toggleButton" onclick="toggleExpand(${expandoList.push(expansion) - 1})"></button>
    <button class="deletoBtn" onclick="deleteParent(event)">X</button>
    </div>`
    newBigTask.classList.add("bigTask")
    newBigTask.style.backgroundColor = task_bg_colors[Math.floor(Math.random() * task_bg_colors.length)]
    expansion.style.backgroundColor = newBigTask.style.backgroundColor
    newBigTask.appendChild(expansion)
    bigTasksDiv.appendChild(newBigTask)
})

splitTasksBtn.addEventListener("click", () => {
    createSplitTasks()
})