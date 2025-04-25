// assets/js/App.js
import AdminDashboard   from "./components/admin/DashboardComponent.js";
import TeacherDashboard from "./components/teacher/DashboardComponent.js";
import ParentDashboard  from "./components/parent/DashboardComponent.js";
import AuthService      from "./services/AuthService.js";
import { getCurrentPage, redirectToError } from "./services/Utils.js";

(async function () {
  const page = getCurrentPage();  
  const routeToRole = {
    "admin.html":   "admin",
    "teacher.html": "teacher",
    "parent.html":  "parent"
  };
  // If this is one of our protected pages...
  if (routeToRole[page]) {
		let user;
    try {
      user = AuthService.getCurrentUser();  
    } catch (_) {
      return; // getCurrentUser() already did a logout+redirect
    }

    // Strictly enforce role→page
    if (!user || routeToRole[page] !== user.role) {
      return redirectToError();
    }

    // Mount the right dashboard
    switch (page) {
      case "admin.html":
				console.log(user);
        new AdminDashboard(user).init();
        break;
      case "teacher.html":
        new TeacherDashboard(user).init();
        break;
      case "parent.html":
        new ParentDashboard(user).init();
        break;
    }
  }else{
		return redirectToError();
	}
})();
