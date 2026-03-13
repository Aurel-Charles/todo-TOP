import { anniversiareProjet, cake, gift } from "./app.js";
import "./style.css";

console.log("Todo-app");

console.log(anniversiareProjet.name);
anniversiareProjet.addTodo(cake)
anniversiareProjet.addTodo(gift)
gift.toggleDone()

console.log(anniversiareProjet.getList());
// anniversiareProjet.removeTodo(cake)
// console.table(anniversiareProjet.getList());
