import { format , parseISO } from "date-fns";
import { expandTodoBtn } from "../utilities/buttons.js";
import { makeIconCircle ,makeIconExpandOff ,makeIconExpandOn, makeIconDelete, makeIconEdit } from "../utilities/icons.js";
import { modaleAddTaskIsOpen,modaleEditTaskIsOpen, setmodaleAddTaskIsOpen, setmodaleEditTaskIsOpen} from "./uiState.js";
import { openTodoModale } from "./renderModale.js";
import { saveLocalStorage } from "../utilities/localStorage.js";
import { removeToDoFromProject, store } from "../app/app.js";

function renderTodoControls(todo, onToggleExpand) {
    const circleDiv = document.createElement('div')
    circleDiv.classList.add('todo-utilities')
    const circleIcon = makeIconCircle()
    if (todo.isDone) {
        circleIcon.classList.add('circle-done')
    } 
    circleDiv.append(circleIcon)

    const iconExpandOff = makeIconExpandOff()
    const iconExpandOn = makeIconExpandOn()
    if (todo.isExpand) {
        expandTodoBtn(circleDiv, iconExpandOn, iconExpandOff, onToggleExpand)
    }
    else {
        expandTodoBtn(circleDiv, iconExpandOff, iconExpandOn, onToggleExpand)
    }
    return circleDiv
}

function renderTodoFields(todo, onRefresh) {
    const headerFields = []
    const mainFields = []
    for (const [key, value] of Object.entries(todo)) {
        if (typeof value === "function") {
            continue
        }
        else if (key == 'id' || key == 'isExpand') {
            continue
        }
        else if (key  == "title") {
            const keyDiv = document.createElement('div')
            keyDiv.classList.add(`todo-${key}`)

            const elementKey = document.createElement('h3')
            elementKey.textContent = value

            keyDiv.append(elementKey)
            headerFields.push(keyDiv)
        }
        else if (key == "isDone") {
            const keyDiv = document.createElement('div')
            keyDiv.classList.add(key)

            const checkBox = document.createElement('input')
            checkBox.setAttribute("type", "checkbox")
            checkBox.setAttribute("id", "check-todo"+todo.id)
            checkBox.setAttribute("name", "check-todo")
            const checkBoxLabel = document.createElement('label')
            checkBoxLabel.setAttribute('id', 'check-todo'+todo.id)
            if (value == true) {
                checkBoxLabel.textContent = "Done"
                checkBox.checked = true
            }
            else{
                checkBoxLabel.textContent = "Pending"
                checkBox.checked = false
            }

            checkBox.addEventListener('change', ()=> {
                todo.toggleDone()
                onRefresh()
                setmodaleAddTaskIsOpen(false)
                setmodaleEditTaskIsOpen(false)
                saveLocalStorage(store)
            })
            keyDiv.append(checkBox, checkBoxLabel)

            headerFields.push(keyDiv)
        }
        
        else if (key == "dueDate" && value) {
            const keyDiv = document.createElement('div')
            keyDiv.classList.add(key)
            
            const elementKey = document.createElement('p')
            elementKey.textContent = "Date"
            elementKey.textContent = elementKey.textContent.toUpperCase()
            elementKey.classList.add('todo-key')
            keyDiv.appendChild(elementKey)

            const elementValue = document.createElement('p')
            
            const date = format(parseISO(value), "EEEE d MMMM yyyy")
            elementValue.textContent = date
            elementValue.classList.add('todo-value')
            keyDiv.appendChild(elementValue)

            mainFields.push(keyDiv)
        }
        else if (key == "priority") {
            const keyDiv = document.createElement('div')
            keyDiv.classList.add(key)

            const labelKey = document.createElement('label')
            labelKey.textContent = key
            labelKey.classList.add('todo-key')
            labelKey.setAttribute('for', 'priority')
            keyDiv.appendChild(labelKey)

            const selectPriority = document.createElement('select')
            selectPriority.setAttribute('name', 'priotiy')
            selectPriority.classList.add("todo-value")

            // choice
            const optionLow = document.createElement('option')
            optionLow.setAttribute('value', "low")
            optionLow.textContent = "LOW"
            if (value == "low") {
                optionLow.setAttribute("selected", "")
            }
            
            const optionMid = document.createElement('option')
            optionMid.setAttribute('value', "mid")
            optionMid.textContent = "MID"
            if (value == "mid") {
                optionMid.setAttribute("selected", "")
            }
            
            const optionHigh = document.createElement('option')
            optionHigh.setAttribute('value', "high")
            optionHigh.textContent = "HIGH"
            if (value == "high") {
                optionHigh.setAttribute("selected", "")
            }
            
            // change
            selectPriority.addEventListener('change', (e)=> {
                todo.edit(key, e.target.value)
                saveLocalStorage(store)

            })

            // append
            selectPriority.append(optionLow, optionMid, optionHigh)
            keyDiv.append(labelKey, selectPriority)

            mainFields.push(keyDiv)
        }
        else if (key == "checklist") {
            const keyDiv = document.createElement('div')
            keyDiv.classList.add(key)
            
            const elementKey = document.createElement('p')
            elementKey.textContent = key
            elementKey.classList.add('todo-key')
            keyDiv.appendChild(elementKey)
        
            const listDiv = document.createElement('ul')
        
            Object.entries(value).forEach(([itemText, itemDone]) => {
                const itemElement = document.createElement('li')
                itemElement.classList.add('checklist-item')
                
                const checkBox = document.createElement('input')
                checkBox.setAttribute("type", "checkbox")
                checkBox.setAttribute("id", "check-todo"+itemText)
                checkBox.setAttribute("name", "check-todo")
                const checkBoxLabel = document.createElement('label')
                checkBoxLabel.setAttribute('id', 'check-todo'+itemText)
                checkBoxLabel.textContent = itemText
                if (itemDone == true) {
                    checkBox.checked = true
                    checkBoxLabel.classList.add('item-checked')
                }
                else{
                    checkBox.checked = false
                    checkBoxLabel.classList.remove('item-checked')
                }
                checkBox.addEventListener('change', () => {
                    todo.checklist[itemText] = checkBox.checked
                    checkBoxLabel.classList.toggle('item-checked')
                    onRefresh()
                    saveLocalStorage(store)
                })
                itemElement.append(checkBox, checkBoxLabel)
                listDiv.append(itemElement)
            })
            
            keyDiv.append(listDiv)
            mainFields.push(keyDiv)
        }
        else if (key){
            const keyDiv = document.createElement('div')
            keyDiv.classList.add(key)
            
            const elementKey = document.createElement('p')
            elementKey.textContent = key + ":"
            elementKey.textContent = elementKey.textContent.toUpperCase()
            elementKey.classList.add('todo-key')
            keyDiv.appendChild(elementKey)

            const elementValue = document.createElement('p')
            elementValue.textContent = value
            elementValue.classList.add('todo-value')
            keyDiv.appendChild(elementValue)

            mainFields.push(keyDiv)
        }
    }
    return {headerFields, mainFields}
}


function renderTodoActions(todo, activeProject, onRefresh) {
    const todoFooter = document.createElement('div')
    todoFooter.classList.add('todo-footer')

    const btnRemove = document.createElement("button")
    const iconDelete = makeIconDelete()
    btnRemove.append(iconDelete)
    btnRemove.classList.add('btn-remove-todo')
    btnRemove.addEventListener('click', ()=> {
        removeToDoFromProject(activeProject, todo)
        onRefresh()
        setmodaleAddTaskIsOpen(false)
        setmodaleEditTaskIsOpen(false)
    })

    const btnEdit = document.createElement("button")
    const iconEdit = makeIconEdit()
    btnEdit.append(iconEdit)
    btnEdit.classList.add('btn-edit-todo')
    btnEdit.addEventListener('click', ()=> {
        if (modaleEditTaskIsOpen) {
            onRefresh()
            openTodoModale(activeProject, todo)
        }
        else if (!modaleEditTaskIsOpen && modaleAddTaskIsOpen) {
            onRefresh()
            openTodoModale(activeProject, todo)
            setmodaleEditTaskIsOpen(true)
            setmodaleAddTaskIsOpen(false)
        }
        else{
            openTodoModale(activeProject, todo)
            setmodaleEditTaskIsOpen(true)
        }
    })
    todoFooter.append(btnRemove, btnEdit)
    return todoFooter
}


export function renderTodo(todo, activeProject, onRefresh) {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // create div for header an main , footer is handle by the renderTodoAction() as it only contains cta
    const todoHeader = document.createElement('div')
    todoHeader.classList.add('todo-header')

    const todoMain = document.createElement('div')
    todoMain.classList.add('todo-main')
    
    const circleAndExpandDiv = renderTodoControls(todo, () => {
        todoMain.classList.toggle("todo-expand")
        todo.isExpand = !todo.isExpand
    })
    if (todo.isExpand) {
        todoMain.classList.add("todo-expand")
    }
// render todo Header and todo Main
    todoHeader.append(circleAndExpandDiv)  
    
    const { headerFields, mainFields } = renderTodoFields(todo, onRefresh)
    headerFields.forEach(el => todoHeader.append(el))
    mainFields.forEach(el => todoMain.append(el))
// rend todo Footer
    const todoFooter = renderTodoActions(todo, activeProject, onRefresh)

    todoDiv.append(todoHeader, todoMain, todoFooter)
    return todoDiv
}

export function renderTodoList(activeProject, div, onRefresh) {
    activeProject.getList().forEach(todo => {
        const todoDiv = renderTodo(todo, activeProject,onRefresh)
        div.appendChild(todoDiv)
    });
}