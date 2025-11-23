const bigTasksDiv = document.getElementById("bigTasksDiv")
const newTaskInput = document.getElementById("newTaskInput")
const newTaskBtn = document.getElementById("newTaskBtn")
const splitTasksDiv = document.getElementById("splitTasksDiv")
const splitTasksBtn = document.getElementById("splitTasksBtn")

const task_bg_colors = ["rgb(229, 237, 255)", "rgb(255, 229, 229)", "rgb(255, 229, 251)",
    "rgb(255, 245, 229)", "rgb(255, 255, 229)", "rgb(232, 255, 229)", "rgb(229, 255, 255)"
]

let expandoList = []

async function api_request(url, stuff){
    const response = await fetch(url, stuff)
    if (!response.ok){
        throw new Error(`error ${response} code ${response.status} caused by request at ${url} for ${stuff}`)
    }
    return response.json()
}

async function ai_request(prompt){
    const response = await api_request("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", 
        {method: "POST", headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AIzaSyBg4IHRzXgfi2MpwNZ3vqE_4jkQ8Z1lHqQ"
        }, body: JSON.stringify({
            contents: [{parts: [{text: prompt}]}]
        })}
    )
    return response.candidates?.[0]?.content?.parts?.[0]?.text || "no text :("
}

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
    newBigTask.style.backgroundColor = task_bg_colors[Math.floor(Math.random() * task_bg_colors.length)]
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

ai_request("Tell me a joke").then(joke => console.log(joke))