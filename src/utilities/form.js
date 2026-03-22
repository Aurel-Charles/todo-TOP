

import { createTodoToProject, store } from "../app/app.js"
import { createTodo } from "../app/todo.js"
import { renderMainProject } from "../render/renderMain.js"
import { setmodaleAddTaskIsOpen , setmodaleEditTaskIsOpen} from "../render/uiState.js"
import { saveLocalStorage } from "./localStorage.js"
import { renderChecklistForm } from "./renderCheckListForm.js"


export function form(activeProject, todo = null) {
    const isNew = !todo
    let getFormChecklist = null

    let entries
    if (isNew) {
        entries = Object.entries(createTodo())
    } else {
        entries = Object.entries(todo)
    }

    const modaleElement = document.createElement('div')
    modaleElement.classList.add('modale')

    const formElement = document.createElement('form')

    const heading = document.createElement('h2')
    if (isNew) {
        heading.textContent = "Adding a New Task"
    }
    else{ 
        heading.textContent = "Edit: " + todo.title
    }
    formElement.append(heading)



    const inputs = {}  //to store inputs from the next loop
    for (const [key, value] of entries) {


        if (typeof value === "function" ) {
            continue
        }
        if (key == "id" || key == "isDone") {
            continue
        }
        if (key == "isExpand") {
            continue
        }
        if (key == "dueDate") {
            const input = document.createElement('input')
            input.setAttribute('type', `date`)
            input.setAttribute('name', `form-input-${key}`)
            input.setAttribute('id', `form-input-${key}`)
            const labelInput = document.createElement('label')
            labelInput.setAttribute('for', `form-input-${key}`)
            labelInput.textContent = key
            
            inputs[key] = input
            if (!isNew && value) { input.value = value }
            
            formElement.append(input, labelInput)    
        }

        
        else if (key == "checklist"){
            let checkListFormDiv
            ({checkListFormDiv, getFormChecklist } = renderChecklistForm(activeProject, todo))
            formElement.append(checkListFormDiv)
        }
        
        else{
            const input = document.createElement('input')
            input.setAttribute('name', `form-input-${key}`)
            input.setAttribute('id', `form-input-${key}`)
            const labelInput = document.createElement('label')
            labelInput.setAttribute('for', `form-input-${key}`)
            labelInput.textContent = key
            inputs[key] = input
            if (!isNew && value) { input.value = value }
            formElement.append(input, labelInput)    
            }
    }
    
    const btnValidate = document.createElement('button')
    btnValidate.textContent ="OK"
    btnValidate.addEventListener('click', (e)=>{
        e.preventDefault()
        modaleElement.classList.add('modale-closing')
        modaleElement.addEventListener('animationend', () => {
            modaleElement.remove()
        if (isNew) {
            createTodoToProject(activeProject,inputs["title"].value, inputs["description"].value, inputs["dueDate"].value, inputs["priority"].value, inputs["note"].value, getFormChecklist())
            renderMainProject(activeProject)
            setmodaleAddTaskIsOpen(false)
        }
        else{
            for (const key of Object.keys(inputs)) {
                todo.edit(key, inputs[key].value)
            }
            todo.edit("checklist", getFormChecklist())
            saveLocalStorage(store)
            renderMainProject(activeProject)
            setmodaleEditTaskIsOpen(false)
        }
        })
    })
    formElement.append(btnValidate)

    const btnClose = document.createElement('button')
    btnClose.textContent = "Cancel"
    btnClose.addEventListener('click', (e)=>{
        e.preventDefault()
        // modaleElement.remove()
        modaleElement.classList.add('modale-closing')
        modaleElement.addEventListener('animationend', () => {
            modaleElement.remove()
        })
        setmodaleAddTaskIsOpen(false)
        setmodaleEditTaskIsOpen(false)
    })
    formElement.append(btnClose)

    modaleElement.append(formElement)
    return modaleElement
}

