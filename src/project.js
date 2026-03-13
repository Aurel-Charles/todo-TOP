export function createProject(name) {
    const project = {
        name,
        list: []
    }

    const addTodo = function (todo) {
        project.list.push(todo)
    }

    const getList = function () {
        return project.list
    }

    
    return {name, addTodo, getList}
}