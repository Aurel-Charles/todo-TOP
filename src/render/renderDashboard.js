import { add ,format, parseISO } from "date-fns";
import { renderMainProject } from "./renderMain.js";
import { makeIconCoffee } from "../utilities/icons.js";

function collectDashboardData(store) {
    let totalTodos = 0
    let completedTodos = 0
    const highPriorityTodos = []
    const upcomingTodos = []    // dueDate dans les 7 prochains jours
    const allProjects = []
    const overdueTodos = []

    const withinSevenDays = add((new Date ),{days: 7})
    
    for (const library of store.getList()) {
        for (const project of library.getList()) {
            allProjects.push(project)
            for (const todo of project.getList()) {
                totalTodos ++

                if (todo.isDone == true) {
                    completedTodos ++
                }
                if (todo.priority == "high") {
                    highPriorityTodos.push(todo)
                }
                if (todo.dueDate && new Date(todo.dueDate) <= withinSevenDays) {
                    upcomingTodos.push(todo)
                }
                if (todo.dueDate && !todo.isDone && new Date(todo.dueDate) && new Date(todo.dueDate) < new Date()) {
                    overdueTodos.push(todo)
                }
            }
        }
    }
    upcomingTodos.sort( (a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    return { totalTodos, completedTodos,highPriorityTodos, upcomingTodos, allProjects , overdueTodos}
}


function renderDashboardBlock(title, content){
    const blockDiv = document.createElement('div')
    let classTitle = title.toLowerCase()
    blockDiv.classList.add(classTitle.replace(/ /g, '-'))

    const titleElement = document.createElement('h1')
    titleElement.textContent = title

    const mainDiv = document.createElement('div')
    mainDiv.classList.add(`${classTitle.replace(/ /g, '-')}-body`)
    mainDiv.append(content)

    blockDiv.append(titleElement, mainDiv)
    return blockDiv
}

export function renderDashboard(store) {
    const mainDiv = document.querySelector("main")
    mainDiv.replaceChildren()

    const mainHeader = document.createElement('div')
    mainHeader.classList.add('main-header')
    mainDiv.append(mainHeader)

    const dashboard = document.createElement('h2')
    dashboard.textContent = "Dashboard"
    dashboard.classList.add('main-title')
    mainHeader.appendChild(dashboard)

    const mainBody = document.createElement('div')  // where blocks are
    mainBody.classList.add('main-body')
    mainDiv.append(mainBody)

    const { totalTodos, completedTodos, highPriorityTodos, upcomingTodos , allProjects, overdueTodos} = collectDashboardData(store)

    // stat block
    const statsContent = document.createElement('div')

    const totalContent = document.createElement('p')
    totalContent.textContent = `${totalTodos} todos`
    const completedContent = document.createElement('p')
    completedContent.textContent = `${completedTodos} completed`

    statsContent.append(totalContent,completedContent)

    mainBody.append(renderDashboardBlock("Stats", statsContent))

    // highpriority block
    const priorityBlock = document.createElement('div')

    if (highPriorityTodos.length > 0) {
        for (const todo of highPriorityTodos) {
            const todoDiv = document.createElement('div')

            const title = document.createElement('h4')
            title.textContent = todo.title
    

            const date = document.createElement('h4')
            if (todo.dueDate) {
                date.textContent = format(parseISO(todo.dueDate), "E d MMMM yyyy")
            }
     
            todoDiv.append(title, date)
            priorityBlock.append(todoDiv)
        }
    }
    else{ 
        const text = document.createElement('p')
        text.textContent = "Nothing urgent! Relax and grab a coffee!"
        const iconCoffee = makeIconCoffee()

        priorityBlock.append(text, iconCoffee)
     }
     mainBody.append(renderDashboardBlock("High Priority", priorityBlock))

     // upcoming todos
     const upcomingBlock = document.createElement('div')

     if (upcomingTodos.length > 0) {
         for (const todo of upcomingTodos) {
             const todoDiv = document.createElement('div')
 
             const title = document.createElement('h4')
             title.textContent = todo.title
            
             if (todo.description) {
                 const description = document.createElement('p')
                 description.classList.add('description-date-todo')
                 description.textContent = todo.description
                 todoDiv.append(description)
             }
             
             const date = document.createElement('p')
             date.classList.add('upcoming-date-todo')
             if (todo.dueDate) {
                 date.textContent = format(parseISO(todo.dueDate), "EEE dd MMMM yyyy ")
             }
      
             todoDiv.prepend(title,date)

             upcomingBlock.append(todoDiv)
         }
     }
     else{ 
         const text = document.createElement('p')
         text.textContent = "Looks like a chill week!"
         upcomingBlock.append(text)
      }
    mainBody.append(renderDashboardBlock("Happening this week", upcomingBlock))

    // allProjectsBlock
    const allProjectsBlock = document.createElement('div')

     if (allProjects.length > 0) {
        for (const project of allProjects) {
            const projectDiv = document.createElement('div')

            projectDiv.addEventListener('click' , ()=> {
                renderMainProject(project)
            })

            const name = document.createElement('h4')
            name.textContent = project.name
    
            projectDiv.append(name)
            allProjectsBlock.append(projectDiv)


            if (project.getList().length > 0) {
                let todoCompleted = 0 
                let totalTodos = project.getList().length
                for (const todo of project.getList()) {
                    if (todo.isDone == true) {
                        todoCompleted ++
                    }
                }
                const progressBar = document.createElement('progress')
                progressBar.setAttribute('max', totalTodos)
                progressBar.setAttribute('value', todoCompleted)
    
                const stat = document.createElement('p')
                stat.textContent = `${todoCompleted}/${totalTodos}`
    
                projectDiv.append(progressBar , stat)
            }
            else{
                const stat = document.createElement('p')
                stat.textContent = `no todos yet`
    
                projectDiv.append(stat)
            }
        }
  
    }

    else{ 
        const text = document.createElement('p')
        text.textContent = "No project yet"
        allProjectsBlock.append(text)
    }
    mainBody.append(renderDashboardBlock("All project", allProjectsBlock))
    
    // overdues block 
    const overdueBlock = document.createElement('div')

    
    if (overdueTodos.length > 0) {
        const numberOverdue = document.createElement('p')
        numberOverdue.textContent = `Total Overdues:  ${overdueTodos.length}` 
        overdueBlock.append(numberOverdue)

        for (const todo of overdueTodos) {
            const todoDiv = document.createElement('div')


            const title = document.createElement('h4')
            title.textContent = todo.title
    
            const date = document.createElement('h4')
            if (todo.dueDate) {
                date.textContent = format(parseISO(todo.dueDate), "E d ")
            }
     
            todoDiv.append(title,date)
            overdueBlock.append(todoDiv)
        }
    }
    else{ 
        const text = document.createElement('p')
        text.textContent = "You're up to date!"
        overdueBlock.append(text)
     }
   mainBody.append(renderDashboardBlock("Overdues Todo's", overdueBlock))
}