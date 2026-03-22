export function createLibrary(name, id = crypto.randomUUID()) {
    const library = {
        name,
        id,
        list: []
    }

    const addProject = function (project) {
        library.list.push(project)
    }

    const getList = function () {
        return library.list
    }

    const removeProject = function (project) {
        const newList = library.list.filter(item => item.getId() !== project.getId());
        library.list = newList
    }

    const getId = function () {
        return library.id
    }

    return {name, addProject, getList, removeProject, getId}
}