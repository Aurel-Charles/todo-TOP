export function createLibrary(name) {
    const library = {
        name,
        list: []
    }

    const addProject = function (project) {
        library.list.push(project)
    }

    const getList = function () {
        return library.list
    }

    const removeProject = function (project) {
        const newList = library.list.filter(item => item.name !== project.name);
        library.list = newList
    }

    return {name, addProject, getList, removeProject}
}