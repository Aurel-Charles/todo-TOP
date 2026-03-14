import { renderMainProject } from "./renderMain.js";

export let activeProject = null

export function renderNavProjectByLibrary(library, libraryDiv) {
    console.log(library.getList());

    library.getList().forEach(project => {
        console.log(project.name);
        
        const nameProject = document.createElement('p')
        nameProject.textContent = project.name
        nameProject.addEventListener('click', ()=>{
            activeProject = project
            console.log("Active Project is: " + activeProject);
            renderMainProject(activeProject)
        })

        libraryDiv.appendChild(nameProject)
    });
    
}


export function renderNavLibrary(library) {
    console.log(library);
    const navDiv = document.querySelector("nav")

    const nameLibrary = document.createElement('h2')
    nameLibrary.textContent = library.name

    const libraryDiv = document.createElement("div")
    libraryDiv.appendChild(nameLibrary)

    renderNavProjectByLibrary(library, libraryDiv)

    navDiv.appendChild(libraryDiv)
}
