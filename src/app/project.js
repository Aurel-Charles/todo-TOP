export function createProject(name, id = crypto.randomUUID()) {
    const project = {
        name,
        id,
        list: []
    }

    const addTodo = function (todo) {
        project.list.push(todo)
    }

    const getList = function () {
        return project.list
    }

    const removeTodo = function (todo) {
        const newList = project.list.filter(item => item.id !== todo.id);
        project.list = newList
    }

    const getId = function () {
        return project.id
    }

    return {name, addTodo, getList, removeTodo, getId}
}