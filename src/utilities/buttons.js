import { makeIconAdd, makeIconDeleteSmall, makeIconValidate } from "./icons.js"

export function addBtnNav(div, icon1,icon2, itemToAdd , callback ) {
    const btn = document.createElement('button')


    btn.append(icon1)
    btn.append(icon2)
    btn.classList.add('btn-add')

    let renderInput = false
    btn.addEventListener('click', ()=>{
        if (renderInput) {
            return
        }

        const modaleAddProject = document.createElement('div')
        modaleAddProject.classList.add("modale-add-project")

        const inputLabel = document.createElement('label')
        inputLabel.textContent = itemToAdd === "library" ? "New Library Name" : "New Project Name"

        inputLabel.setAttribute("for", 'add-input')
        const input = document.createElement('input')
        input.setAttribute("name", 'add-input')
        input.setAttribute("id", 'add-input')
        input.setAttribute("type", 'text')

        const btnValidate = document.createElement('button')
        const iconValidate = makeIconValidate()

        btnValidate.append(iconValidate)

        const btnClose = document.createElement('button')
        const iconBtnClose = makeIconDeleteSmall()
        btnClose.append(iconBtnClose)

        modaleAddProject.append(inputLabel, input, btnValidate, btnClose)

        div.append(modaleAddProject)

        btnValidate.addEventListener('click', ()=>{
            callback(input.value)
        })

        btnClose.addEventListener('click', ()=> {
           div.removeChild(modaleAddProject)
           renderInput = false
        })




        renderInput = true

    })
    div.appendChild(btn)
}

export function addBtnModale(div, text, callback) {
    const iconAdd = makeIconAdd()
    
    const btn = document.createElement('button')
    btn.classList.add('btn-add-task')
    btn.textContent = text
    btn.prepend(iconAdd)

    btn.addEventListener('click', ()=>{
        callback()
    })


    div.append(btn)
}


export function removeBtn(div, icon, callback) {
    const btn = document.createElement('button')
    btn.append(icon)
    btn.classList.add(`btn-remove`)
    btn.addEventListener('click', ()=>{
        callback()
    })
    div.appendChild(btn)
}


export function expandTodoBtn(div,icon1, icon2,  callback) {
    const btn = document.createElement('button')
    btn.append(icon1)
    btn.classList.add(`btn-expand`)
    
    btn.addEventListener('click', ()=>{
        callback()
        btn.classList.toggle('expanded')
        if (div.contains(icon1)) {
            btn.replaceChild(icon2, icon1)
        }
        else{
            btn.replaceChild(icon1, icon2)
        }
    })
    div.appendChild(btn)
}



export function editBtnNav(div, icon1, itemToAdd , callback ) {
    const btn = document.createElement('button')


    btn.append(icon1)
    btn.classList.add('btn-edit')

    let renderInput = false
    btn.addEventListener('click', ()=>{
        if (renderInput) {
            return
        }

        const modaleAddProject = document.createElement('div')
        modaleAddProject.classList.add("modale-edit-project")

        const inputLabel = document.createElement('label')
        inputLabel.textContent = itemToAdd

        inputLabel.setAttribute("for", 'edit-input')
        const input = document.createElement('input')
        input.setAttribute("name", 'edit-input')
        input.setAttribute("id", 'edit-input')
        input.setAttribute("type", 'text')

        const btnValidate = document.createElement('button')
        const iconValidate = makeIconValidate()

        btnValidate.append(iconValidate)

        const btnClose = document.createElement('button')
        const iconBtnClose = makeIconDeleteSmall()
        btnClose.append(iconBtnClose)

        modaleAddProject.append(inputLabel, input, btnValidate, btnClose)

        div.append(modaleAddProject)

        btnValidate.addEventListener('click', ()=>{
            callback(input.value)
        })

        btnClose.addEventListener('click', ()=> {
           div.removeChild(modaleAddProject)
           renderInput = false
        })




        renderInput = true

    })
    div.appendChild(btn)
}