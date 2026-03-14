import "./style.css";

import { myFamilly, myLibrary } from "./app/app.js";
import { renderNavLibrary, renderNavProjectByLibrary } from "./render/renderSidebar.js";


console.log(myLibrary.getList());
console.log(myLibrary.getList()[0].getList());


renderNavLibrary(myLibrary)
renderNavLibrary(myFamilly)






