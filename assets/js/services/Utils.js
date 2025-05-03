// Utility to get current page filename (without hashes)
export function getCurrentPage() {
  const page = window.location.pathname.split("/").pop().split("#")[0];
  return page || "login.html";
}



//REDIRECT TO ERROR PAGE
export function redirectToError(){
	window.location.href = 'error.html';
}




// front-end from validation

export function formValidation(form,e){
		e.preventDefault();
		if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return true;
    }
		return false;
}