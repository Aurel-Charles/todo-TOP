export function createTodo(title, description, dueDate, priority, note, checkList) {

    const todo = {
        title,
        description,
        dueDate,
        priority,
        note,
        checkList
    }
    return todo
}