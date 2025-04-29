import AuthService from "../../services/AuthService.js";
import UserManagement from "./UserManagementComponent.js";
import StudentManagement from "./StudentManagementComponent.js";
import ClassManagement from "./ClassManagementComponent.js";
// assets/js/components/admin/AdminDashboard.js
import { addFakeDataToCache } from "../../services/fakeData.js"; // <- Important: Load fake data first!
export default class AdminDashboard {
  constructor(user) {
    this.user = user;
  }

  init() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const dashboard = document.getElementById("app");
  }

  addEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      addFakeDataToCache();
			setTimeout(()=>
				new UserManagement().init()
				,25)

    });
    document.getElementById("userMng-tab").addEventListener("click", () => {
      new UserManagement().init();
    });
    document.getElementById("stuMng-tab").addEventListener("click", () => {
      new StudentManagement().init();
    });
    document.getElementById("classMng-tab").addEventListener("click", () => {
      new ClassManagement().init();
    });
    document.getElementById("logout-tab").addEventListener("click", () => {
      AuthService.logout();
      location.href = "login.html";
    });
  }
}
