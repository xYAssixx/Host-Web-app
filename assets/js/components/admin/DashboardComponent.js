// assets/js/components/admin/AdminDashboard.js
import AuthService from "../../services/AuthService.js";
import UserManagement from "./UserManagementComponent.js";
import StudentManagement from "./StudentManagementComponent.js";
import ClassManagement from "./ClassManagementComponent.js";
import RecordAttendance from "../shared/RecordAttendanceComponent.js";
import StudentProfile from "../shared/StudentProfileComponent.js";
import { addFakeDataToCache } from "../../services/fakeData.js";

// Singleton instances
const studentProfileInstance = new StudentProfile();
const studentManagementInstance = new StudentManagement(studentProfileInstance);
const classManagementInstance = new ClassManagement(studentManagementInstance); // <-- Inject dependency
const userManagementInstance = new UserManagement();
const recordAttendanceInstance = new RecordAttendance();

export default class AdminDashboard {
  constructor(user) {
    this.user = user;
  }

  init() {
    this.render();
    this.setupApp();
    this.addEventListeners();
  }

  render() {
    const dashboard = document.getElementById("app");
    // Rendering logic if needed
  }

  setupApp() {
    // Load fake data & initialize core tab
    document.addEventListener("DOMContentLoaded", () => {
      addFakeDataToCache();
      setTimeout(() => {
        let studentId = 1;
      studentProfileInstance.init(studentId,this.user.role); // Only once
      }, 400);
    });
  }

  addEventListeners() {
    document.getElementById("userMng-tab").addEventListener("click", () => {
      userManagementInstance.init();
    });

    document.getElementById("stuMng-tab").addEventListener("click", () => {
      studentManagementInstance.init();
    });

    document.getElementById("classMng-tab").addEventListener("click", () => {
      classManagementInstance.init();
    });

    document.getElementById("rcrdAtnd-tab").addEventListener("click", () => {
      recordAttendanceInstance.init();
    });

    document.getElementById("stuProf-tab").addEventListener("click", () => {
			let studentId = 1;
      studentProfileInstance.init(studentId,this.user.role);
    });

    document.getElementById("logout-tab").addEventListener("click", () => {
      AuthService.logout();
      location.href = "login.html";
    });
  }
}
