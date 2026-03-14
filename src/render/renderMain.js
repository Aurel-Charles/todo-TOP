export function renderMainProject(activeProject) {
    console.log("rendre le main");
    const mainDiv = document.querySelector("main")
    mainDiv.replaceChildren()

    const nameProject = document.createElement('p')
    nameProject.textContent = activeProject.name
    mainDiv.appendChild(nameProject)

    if (activeProject.getList().length == 0) {
        const element = document.createElement('p')
        element.textContent = "No TODO"
        mainDiv.appendChild(element)
    }

    else{
        activeProject.getList().forEach(todo => {
            console.log(todo);
            const todoDiv = document.createElement('div')
            todoDiv.classList.add('todo')
            
    
            for (const [key, value] of Object.entries(todo)) {
                if (typeof value === "function" ) {
                    continue
                }



                console.log(`${key}: ${value}`);
    
                const keyDiv = document.createElement('div')
                keyDiv.classList.add(key)
                
                const elementKey = document.createElement('p')
                elementKey.textContent = key
                keyDiv.appendChild(elementKey)
    
                const elementValue = document.createElement('p')
                elementValue.textContent = value
                keyDiv.appendChild(elementValue)

                todoDiv.appendChild(keyDiv)
              }
    
            // const title = document.createElement('p')
            // title.textContent = todo.title
            // todoDiv.appendChild(title)
            
            // const description = document.createElement('p')
            // description.textContent = todo.description
            // todoDiv.appendChild(description)
    
            
            mainDiv.appendChild(todoDiv)
        });

    }
    

    
}