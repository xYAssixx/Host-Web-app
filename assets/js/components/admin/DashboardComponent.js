import AuthService from "../../services/AuthService.js";

// assets/js/components/admin/AdminDashboard.js
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
    dashboard.innerHTML = `
      <h1>Welcome Admin, ${this.user.username}</h1>
      <button id="manageUsersBtn">Manage Users</button>
      <button id="manageCoursesBtn">Manage Courses</button>
      <button id="logout" class="btn btn-outline-danger">Logout</button>
    `;
  }

  addEventListeners() {
    // document.getElementById("manageUsersBtn").addEventListener("click", () => {
    //   // Simulated API call for user management
    //   this.simulateApiCall("Manage Users").then(response => {
    //     console.log(response);
    //     alert(response);
    //   });
    // });

    // document.getElementById("manageCoursesBtn").addEventListener("click", () => {
    //   // Simulated API call for course management
    //   this.simulateApiCall("Manage Courses").then(response => {
    //     console.log(response);
    //     alert(response);
    //   });
    // });
    document.getElementById("logout").addEventListener("click", () => {
      AuthService.logout();
      location.href = "login.html";
    });
  }

  // Simulating API calls for different admin tasks
  async simulateApiCall(action) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulating API delay
    return `Successfully accessed the ${action} page with fake data!`;
  }
}
