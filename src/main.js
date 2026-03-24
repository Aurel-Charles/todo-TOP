import { renderNav } from "./render/renderSidebar.js";
import {
  store,
  createLibraryToStore,
  createProjectToLibrary,
  createTodoToProject,
} from "./app/app.js";
import "./style.css";
import {
  loadLocalStorage,
} from "./utilities/localStorage.js";
import { renderDashboard } from "./render/renderDashboard.js";

if (!localStorage.getItem("defaultStore")) {
  // --- Libraries ---
  createLibraryToStore(store, "Work");
  createLibraryToStore(store, "Personal");

  const work = store.getList()[0];
  const personal = store.getList()[1];

  // --- Projects ---
  createProjectToLibrary(work, "Website Redesign");
  createProjectToLibrary(work, "Mobile App");
  createProjectToLibrary(personal, "Home");
  createProjectToLibrary(personal, "Learning");

  const web = work.getList()[0];
  const app = work.getList()[1];
  const home = personal.getList()[0];
  const learning = personal.getList()[1];

  // --- Website Redesign ---
  createTodoToProject(
    web,
    "Design mockups",
    "Figma v3",
    "2026-03-20",
    "high",
    "Client wants dark mode",
  );
  createTodoToProject(
    web,
    "Client feedback",
    "Review meeting notes",
    "2026-03-22",
    "high",
    "",
  );
  createTodoToProject(
    web,
    "Homepage update",
    "Hero section + CTA",
    "2026-03-25",
    "medium",
    "",
  );
  createTodoToProject(
    web,
    "SEO audit",
    "Use Lighthouse",
    "2026-04-10",
    "low",
    "",
  );
  web.getList()[0].toggleDone(); // "Design mockups" → complété

  // --- Mobile App ---
  createTodoToProject(
    app,
    "Fix login bug",
    "Token refresh crash",
    "2026-03-24",
    "high",
    "Repro: logout + relogin",
  );
  createTodoToProject(
    app,
    "Push notifications",
    "iOS + Android setup",
    "2026-03-26",
    "medium",
    "",
  );
  createTodoToProject(
    app,
    "App store screenshots",
    "5 screens per locale",
    "2026-04-05",
    "low",
    "",
  );
  app.getList()[1].toggleDone(); // "Push notifications" → complété

  // --- Home ---
  createTodoToProject(
    home,
    "Pay bills",
    "Electricity + internet",
    "2026-03-21",
    "high",
    "",
  );
  createTodoToProject(
    home,
    "Grocery shopping",
    "Weekly run",
    "2026-03-24",
    "medium",
    "",
  );
  createTodoToProject(home, "Book dentist", "", "2026-03-27", "low", "");

  // --- Learning ---
  createTodoToProject(
    learning,
    "Finish JS course",
    "Odin Project",
    "2026-03-27",
    "medium",
    "Almost done!",
  );
  createTodoToProject(
    learning,
    "Read CSS book",
    "Chapter 8-12",
    "2026-04-15",
    "low",
    "",
  );
  createTodoToProject(
    learning,
    "Build portfolio",
    "Deploy on Netlify",
    "2026-04-20",
    "high",
    "",
  );
  learning.getList()[1].toggleDone(); // "Read CSS book" → complété
} else {
  loadLocalStorage(store);
}

renderNav(store);
renderDashboard(store);
