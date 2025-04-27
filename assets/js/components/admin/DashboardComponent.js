import AuthService from "../../services/AuthService.js";
import UserManagement from "./UserManagementComponent.js";
// import StudentManagement from "./StudentManagementComponent.js";
// assets/js/components/admin/AdminDashboard.js
import {addFakeDataToCache} from '../../services/fakeData.js'; // <- Important: Load fake data first!
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
				document.addEventListener("DOMContentLoaded" , ()=>{
			addFakeDataToCache();
			new UserManagement().init();
		})
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
    document.getElementById("logout-tab").addEventListener("click", () => {
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
