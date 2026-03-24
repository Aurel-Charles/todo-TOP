import { form } from "../utilities/form.js";

export function openTodoModale(activeProject, todo = null) {
  const mainDiv = document.querySelector("main");
  mainDiv.appendChild(form(activeProject, todo));
}
