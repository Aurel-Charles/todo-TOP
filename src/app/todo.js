export function createTodo(
  title,
  description,
  dueDate,
  priority = "low",
  note,
  checklist = {},
  id = crypto.randomUUID(),
) {
  const todo = {
    title,
    description,
    dueDate,
    priority,
    note,
    checklist,
    isDone: false,
    id,
    isExpand: false,
    toggleDone: function () {
      this.isDone = !this.isDone;
    },
    edit: function (key, value) {
      todo[key] = value;
    },
  };
  return todo;
}
