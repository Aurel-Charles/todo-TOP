const googleClass = "material-symbols-outlined";

function makeIcon(icon, classIcon) {
  const newIcon = document.createElement("span");
  newIcon.classList.add(classIcon);
  newIcon.textContent = icon;
  return newIcon;
}

// indiviuadl Icon maker function
function makeIconCircle() {
  const newCircle = makeIcon("circle", googleClass);
  newCircle.classList.add("circle");
  return newCircle;
}

function makeIconAdd() {
  const newAdd = makeIcon("add", googleClass);
  return newAdd;
}

function makeIconExpandOff() {
  const newExpandOff = makeIcon("keyboard_arrow_down", googleClass);
  return newExpandOff;
}

function makeIconExpandOn() {
  const newExpandOn = makeIcon("keyboard_arrow_up", googleClass);
  return newExpandOn;
}

function makeIconDelete() {
  const newDelete = makeIcon("delete", googleClass);
  return newDelete;
}

function makeIconEdit() {
  const newEdit = makeIcon("edit", googleClass);
  return newEdit;
}

function makeIconDeleteSmall() {
  const newDeleteSmall = makeIcon("close_small", googleClass);
  return newDeleteSmall;
}

function makeIconLibrary() {
  const newLibrary = makeIcon("library_books", googleClass);
  return newLibrary;
}

function makeIconList() {
  const newList = makeIcon("list_alt", googleClass);
  return newList;
}

function makeIconCreate() {
  const newCreate = makeIcon("edit_square", googleClass);
  return newCreate;
}

function makeIconValidate() {
  const newValidate = makeIcon("task_alt", googleClass);
  return newValidate;
}

function makeIconCoffee() {
  const newCoffee = makeIcon("coffee_maker", googleClass);
  return newCoffee;
}

export {
  makeIconCircle,
  makeIconAdd,
  makeIconExpandOff,
  makeIconExpandOn,
  makeIconDelete,
  makeIconEdit,
  makeIconDeleteSmall,
  makeIconLibrary,
  makeIconList,
  makeIconCreate,
  makeIconValidate,
  makeIconCoffee,
};
