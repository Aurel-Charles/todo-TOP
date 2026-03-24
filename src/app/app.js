import { createStore } from "./store.js";
import { createLibrary } from "./library.js";
import { createProject } from "./project.js";
import { createTodo } from "./todo.js";
import { saveLocalStorage } from "../utilities/localStorage.js";

export function createLibraryToStore(store, libraryName) {
  const newLibrary = createLibrary(libraryName);
  store.addLibrary(newLibrary);
  saveLocalStorage(store);
}

export function createProjectToLibrary(library, projectName) {
  const newProject = createProject(projectName);
  library.addProject(newProject);
  saveLocalStorage(store);
}

export function createTodoToProject(
  project,
  title,
  description,
  dueDate,
  priority,
  note,
  checklist,
) {
  const todo = createTodo(
    title,
    description,
    dueDate,
    priority,
    note,
    checklist,
  );
  project.addTodo(todo);
  saveLocalStorage(store);
}

export function removeLibraryFromStore(store, library) {
  store.removeLibrary(library);
  saveLocalStorage(store);
}

export function removeProjectFromLibrary(library, project) {
  library.removeProject(project);
  saveLocalStorage(store);
}

export function removeToDoFromProject(project, todo) {
  project.removeTodo(todo);
  saveLocalStorage(store);
}

const store = createStore("Store");

// createLibraryToStore(store, "My Lib")
// createLibraryToStore(store, "Familly")

// createProjectToLibrary(store.getList()[0], "Photobooth")
// createProjectToLibrary(store.getList()[0], "Fusee")

// createTodoToProject(store.getList()[0].getList()[0], "Task", "description blablablablba")
// createTodoToProject(store.getList()[0].getList()[0], "Task02", "description blablablablba")

export { store };
