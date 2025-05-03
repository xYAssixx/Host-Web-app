import AuthService from './services/AuthService.js';
import {formValidation} from './services/Utils.js'
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#login-form");

  form.addEventListener("submit", async (e) => {
    if(formValidation(form,e)){
			return;
		}
    const username = form.querySelector("#username").value;
    const password = form.querySelector("#password").value;

    const result = await AuthService.login(username, password);
		console.log(result)
    const errorBox = document.querySelector("#login-error");

    if (result.success) {
			
      window.location.href = `${result.user.role}.html`;
    } else {
	 
      errorBox.innerHTML = `
	<span class="d-flex align-items-baseline"><i class="bi bi-exclamation-triangle-fill me-3"></i>${result.message || "Invalid credentials."}</span>
			`;
			errorBox.classList.remove("d-none");
			setTimeout(()=>{
				errorBox.classList.add("d-none");
				},3000)
    }
  });
});
