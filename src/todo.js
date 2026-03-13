export function createTodo(title, description, dueDate, priority, note, checkList) {

    const todo = {
        title,
        description,
        dueDate,
        priority,
        note,
        checkList,
        isDone: false
    }

    const toggleDone = function () {
        todo.isDone = !todo.isDone
    }
    return {todo, toggleDone}
}