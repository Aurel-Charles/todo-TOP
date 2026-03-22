import { createLibrary } from "../app/library.js";
import { createProject } from "../app/project.js";
import { createTodo } from "../app/todo.js";



function storageAvailable(type) {
    try {
      const storage = window[type],
        x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0
      );
    }
  }

export function saveLocalStorage(store) {
    if (storageAvailable("localStorage")) {
        localStorage.clear()

        const data = store.getList().map(library => ({
            name: library.name,
            id: library.getId(),
            projects: library.getList().map(project => ({
                name: project.name,
                id: project.getId(),
                todo: project.getList().map(todo => ({
                    title: todo.title,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    priority: todo.priority,
                    note: todo.note,
                    checklist: todo.checklist,
                    isDone: todo.isDone,
                    id: todo.id
                    // toggleDone: todo.toggleDone (not aible to stringify)
                }))
            }))
        }))
        localStorage.setItem('defaultStore',JSON.stringify(data))
        
    } 
    else {
        console.log("NO localStorage available");
    }
}

export function loadLocalStorage(store) {
    if (storageAvailable("localStorage")) {
        const dataStore  = localStorage.getItem("defaultStore")
        const dataStoreParse = JSON.parse(dataStore)
        if (!dataStoreParse) {
            return
        }
        
        for (const library of dataStoreParse) {
            const libraryToPush =  createLibrary(library.name, library.id)
            store.addLibrary(libraryToPush)

            for (const project of library.projects) {
               const projectToPush = createProject(project.name, project.id)
               libraryToPush.addProject(projectToPush)

               for (const todo of project.todo) {
                    const todoToPush = createTodo(
                        todo.title,
                        todo.description,
                        todo.dueDate,
                        todo.priority,
                        todo.note,
                        todo.checklist,
                        todo.id,
                    )
                    if (todo.isDone) {
                        todoToPush.toggleDone()
                        
                    }
                    
                    projectToPush.addTodo(todoToPush)
               }
            }
        }
    } 
    else {
        console.log("NO localStorage available");
    }
}