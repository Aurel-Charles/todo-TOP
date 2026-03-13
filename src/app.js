import { createProject } from "./project.js"
import { createTodo } from "./todo.js"



const mainLibrary = []

const anniversiareProjet = createProject("Anniversiare")
const cake = createTodo("cake", "faire un gateau", "1avril", "high", "blblbabla", false)
const gift = createTodo("gift", "acheter", "1avril", "high", "blblbabla", false)

export { anniversiareProjet, cake, gift}

