import { renderNav } from "./render/renderSidebar.js";
import { store, createLibraryToStore, createProjectToLibrary, createTodoToProject } from "./app/app.js";
import "./style.css";
import { loadLocalStorage, saveLocalStorage } from "./utilities/localStorage.js";
import { renderDashboard } from "./render/renderDashboard.js";



if (!localStorage.getItem('defaultStore')) {
    createLibraryToStore(store, "My Lib")
    createLibraryToStore(store, "Familly")


    createProjectToLibrary(store.getList()[0], "Photobooth")
    createProjectToLibrary(store.getList()[0], "Fusee")

    createTodoToProject(store.getList()[0].getList()[0], "Task", "description blablablablba")
    createTodoToProject(store.getList()[0].getList()[0], "Task02", "description blablablablba")

}else{
    loadLocalStorage(store)
}

renderNav(store)
renderDashboard(store)

