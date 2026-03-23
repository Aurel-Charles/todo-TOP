

import { addBtnModale } from "../utilities/buttons.js";

import { openTodoModale } from "./renderModale.js";
import { renderTodoList } from "./renderTodo.js";

import {setmodaleAddTaskIsOpen, setmodaleEditTaskIsOpen, modaleAddTaskIsOpen, modaleEditTaskIsOpen } from "./uiState.js";
import { makeIconAdd, makeIconCreate } from "../utilities/icons.js";


export function renderMainProject(activeProject) {
    const mainDiv = document.querySelector("main")
    mainDiv.replaceChildren()


    const mainHeader = document.createElement('div')
    mainHeader.classList.add('main-header')
    mainDiv.append(mainHeader)


    const nameProject = document.createElement('h2')
    nameProject.textContent = activeProject.name
    nameProject.classList.add('main-title')
    mainHeader.appendChild(nameProject)

    addBtnModale(mainHeader, `Task`, () =>{
        if (modaleAddTaskIsOpen) {
            return
        }
        if (!modaleAddTaskIsOpen && modaleEditTaskIsOpen) {
            renderMainProject(activeProject)
            openTodoModale(activeProject)
            setmodaleAddTaskIsOpen(true)
            setmodaleEditTaskIsOpen(false)
        }
        else{
            openTodoModale(activeProject)
            setmodaleAddTaskIsOpen(true)
        }
    })



    if (activeProject.getList().length == 0) {
        const emptyDiv = document.createElement('div')
        emptyDiv.classList.add('empty-project-div')
        const element = document.createElement('p')
        element.textContent = "empty!... Create a new task"

        const icon = makeIconCreate()


        emptyDiv.append(element, icon)
        mainDiv.append(emptyDiv)
    }

    else{
        renderTodoList(activeProject, mainDiv, ()=> renderMainProject(activeProject))
    }
}

