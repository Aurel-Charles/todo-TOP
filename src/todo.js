export function createTodo(title, description, dueDate, priority, note, checkList) {

    const todo = {
        title,
        description,
        dueDate,
        priority,
        note,
        checkList,
        isDone: false,
        toggleDone: function (){
            this.isDone = !this.isDone
        },
    }


    return todo
}