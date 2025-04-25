import AuthService from './services/AuthService.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const username = form.querySelector("#username").value;
    const password = form.querySelector("#password").value;

    const result = await AuthService.login(username, password);
    const errorBox = document.querySelector("#login-error");

    if (result.success) {
			
      window.location.href = `${result.user.role}.html`;
    } else {
			let err = document.createElement("span")
			err.innerHTML =  `<i class="bi bi-exclamation-triangle-fill me-3 fs-4"></i>${result.message || "Invalid credentials."}`
      errorBox.append(err) ;
			errorBox.classList.remove("d-none");
			let handler = 
			setTimeout(()=>{
			errorBox.classList.add("d-none");
			},3000)
    }
  });
});
