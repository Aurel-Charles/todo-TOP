import { makeIconAdd, makeIconDeleteSmall } from "./icons.js";

function createChecklistItem(inputText, formCheckList, list) {
  // tout le code de création du li, div, bouton -
  // avec le listener qui fait delete formCheckList[text]

  const checklistItemDiv = document.createElement("div");

  const itemElement = document.createElement("li");
  itemElement.classList.add("checklist-item");
  itemElement.textContent = inputText;
  checklistItemDiv.append(itemElement);

  const removeItemBtn = document.createElement("button");
  const icon = makeIconDeleteSmall();
  removeItemBtn.append(icon);
  itemElement.append(removeItemBtn);
  removeItemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    delete formCheckList[inputText];

    checklistItemDiv.remove();
  });
  list.append(checklistItemDiv);
}

function renderChecklistForm(activeProject, todo) {
  const isNew = !todo;

  const formCheckList = isNew ? {} : { ...todo.checklist }; // copy or create a checklist to put into the todo if validation

  const checkListFormDiv = document.createElement("div");
  checkListFormDiv.classList.add("todo-checklist", "form");

  const titleField = document.createElement("p");
  titleField.textContent = "Checklist";

  const list = document.createElement("ul");

  const inputText = document.createElement("input");
  inputText.setAttribute("id", "input-checklist");

  const addBtn = document.createElement("button");
  const icon = makeIconAdd();
  addBtn.append(icon);
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const text = inputText.value;
    if (text == "") {
      return;
    }
    formCheckList[text] = false;
    createChecklistItem(text, formCheckList, list);
    inputText.value = "";
  });

  if (!isNew) {
    Object.entries(formCheckList).forEach(([key]) =>
      createChecklistItem(key, formCheckList, list),
    );
  }

  checkListFormDiv.append(titleField, addBtn, inputText);
  checkListFormDiv.append(list);

  const getFormChecklist = function () {
    return formCheckList;
  };

  return { checkListFormDiv, getFormChecklist };
}

export { renderChecklistForm };
