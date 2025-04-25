// Utility to get current page filename (without hashes)
export function getCurrentPage() {
  const page = window.location.pathname.split("/").pop().split("#")[0];
  return page || "login.html";
}



//REDIRECT TO ERROR PAGE
export function redirectToError(){
	window.location.href = 'error.html';
}