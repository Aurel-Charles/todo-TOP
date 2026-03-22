
import { createLibraryToStore, createProjectToLibrary , removeLibraryFromStore, removeProjectFromLibrary, store} from "../app/app.js";
import { addBtnNav, removeBtn } from "../utilities/buttons.js";
import { makeIconAdd, makeIconDelete, makeIconDeleteSmall, makeIconLibrary, makeIconList } from "../utilities/icons.js";
import { renderMainProject } from "./renderMain.js";

export let activeProject = null

export function renderNavProjectByLibrary(library, libraryDiv) {

    const projectDiv = document.createElement('div')
    projectDiv.classList.add('nav-allproject-div')

    library.getList().forEach(project => {

        const byProjectDiv = document.createElement('div')
        byProjectDiv.classList.add('nav-project-div')

        const nameProject = document.createElement('p')
        nameProject.textContent = project.name
        nameProject.classList.add('project-name')
        nameProject.addEventListener('click', ()=>{
            activeProject = project
            console.log("Active Project is: " + activeProject.name);
            renderMainProject(activeProject)
        })

        
        byProjectDiv.appendChild(nameProject)
        
        const iconDeleteSmall = makeIconDeleteSmall()
        removeBtn(byProjectDiv, iconDeleteSmall, ()=>{
            libraryDiv.removeChild(projectDiv)
            removeProjectFromLibrary(library, project)
            renderNav(store)
        })

        projectDiv.append(byProjectDiv)

    });
    libraryDiv.append(projectDiv)
    
}


export function renderNavLibrary(library) {
    const navDiv = document.querySelector("nav")

    const libraryDiv = document.createElement("div")
    libraryDiv.classList.add('library')
    
    const libraryHeader = document.createElement('div')
    libraryHeader.classList.add('nav-library-header')

    const libraryFooter = document.createElement('div')
    libraryFooter.classList.add('nav-library-footer')

    const nameLibrary = document.createElement('h2')
    nameLibrary.textContent = library.name
    nameLibrary.classList.add('library-name')
    libraryHeader.appendChild(nameLibrary)

    libraryDiv.append(libraryHeader)

    const iconAdd = makeIconAdd()
    const iconList = makeIconList()
    addBtnNav(libraryFooter, iconAdd, iconList, (nom) => { 
        createProjectToLibrary(library, nom)
        renderNav(store)
     } )
    
    const  iconDelete = makeIconDelete()
    removeBtn(libraryHeader, iconDelete, ()=>{
        navDiv.removeChild(libraryDiv)
        removeLibraryFromStore(store, library)
    })
    renderNavProjectByLibrary(library, libraryDiv)

    libraryDiv.append(libraryFooter)

    navDiv.appendChild(libraryDiv)
}


export function renderNav(store){
    const navDiv = document.querySelector("nav")
    navDiv.replaceChildren()

    const navHeader = document.createElement('div')
    navHeader.classList.add('nav-header')

    const navTitle = document.createElement('h1')
    navTitle.textContent = "Mindspace"
    navHeader.append(navTitle)

    const iconLibrary = makeIconLibrary()
    const iconAdd = makeIconAdd()
    addBtnNav(navHeader,iconAdd, iconLibrary, (nom) => { 
        createLibraryToStore(store, nom)
        renderNav(store)
     })
    navDiv.appendChild(navHeader)
    
    const storeLibrarys = store.getList()
    for (const library of storeLibrarys) {
        renderNavLibrary(library)
    }    

}
