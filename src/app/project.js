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

    const removeTodo = function (todo) {
        const newList = project.list.filter(item => item.title !== todo.title);
        project.list = newList
    }

    return {name, addTodo, getList, removeTodo}
}