import { createLibrary } from "./library.js"
import { createProject } from "./project.js"
import { createTodo } from "./todo.js"


function createProjectToLibrary(library, projectName) {
    const newProject = createProject(projectName)
    library.addProject(newProject)
}

function createTodoToProject( project, title, description, dueDate, priority, note, checklist) {
    const todo = createTodo(title, description, dueDate, priority, note, checklist)
    project.addTodo(todo)
}



const myLibrary = createLibrary("My Lib")



createProjectToLibrary(myLibrary,"Alien")
createProjectToLibrary(myLibrary,"Zombie")

createTodoToProject(myLibrary.getList()[0], "aurel")


export { myLibrary }
