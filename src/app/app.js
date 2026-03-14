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



const myLibrary = createLibrary("Librairie")
const myFamilly = createLibrary("Famille")



createProjectToLibrary(myLibrary,"Alien")
createProjectToLibrary(myLibrary,"Zombie")

createProjectToLibrary(myFamilly, "aurel")
createProjectToLibrary(myFamilly, "alex")
createProjectToLibrary(myFamilly, "caro")

createTodoToProject(myLibrary.getList()[0], "aurel")

createTodoToProject(myFamilly.getList()[0], "todo1Aurel","aurezl descripitotio", "le 1 avril", "high", "pas de note", false )
createTodoToProject(myFamilly.getList()[0], "todo2Aurel")
createTodoToProject(myFamilly.getList()[1], "todo1Alex")
createTodoToProject(myFamilly.getList()[2], "todo1Caro")


export { myLibrary , myFamilly}
