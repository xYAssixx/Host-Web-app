// import { cacheService } from "../services/CacheService.js"; // Adjust path if needed
// import { apiService } from '../services/ApiService.js';     // If you need to clear cache etc.

// // --- Function to add fake users to cache ---
// export function addFakeUsersToCache() {
//   const fakeUsers = [
// 		{ "id": 1, "name": "John Doe", "email": "john@example.com", "role": "Admin", "status": "Active" },
// 		{ "id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "Teacher", "status": "Inactive" },
// 		{ "id": 3, "name": "Alice Johnson", "email": "alice@example.com", "role": "Parent", "status": "Active" },
// 		{ "id": 4, "name": "Bob Brown", "email": "bob@example.com", "role": "Teacher", "status": "Inactive" },
// 		{ "id": 5, "name": "Charlie Davis", "email": "charlie@example.com", "role": "Admin", "status": "Active" },
// 		{ "id": 6, "name": "Emily Clark", "email": "emily@example.com", "role": "Parent", "status": "Inactive" },
// 		{ "id": 7, "name": "Franklin Lewis", "email": "franklin@example.com", "role": "Teacher", "status": "Active" },
// 		{ "id": 8, "name": "Grace Lee", "email": "grace@example.com", "role": "Parent", "status": "Active" },
// 		{ "id": 9, "name": "Henry Wilson", "email": "henry@example.com", "role": "Teacher", "status": "Inactive" },
// 		{ "id": 10, "name": "Ivy Martinez", "email": "ivy@example.com", "role": "Parent", "status": "Active" },
// 		{ "id": 11, "name": "Jack Taylor", "email": "jack@example.com", "role": "Admin", "status": "Active" },
// 		{ "id": 12, "name": "Karen Harris", "email": "karen@example.com", "role": "Teacher", "status": "Inactive" },
// 		{ "id": 13, "name": "Liam Young", "email": "liam@example.com", "role": "Parent", "status": "Active" },
// 		{ "id": 14, "name": "Mia Walker", "email": "mia@example.com", "role": "Teacher", "status": "Active" },
// 		{ "id": 15, "name": "Noah Hall", "email": "noah@example.com", "role": "Parent", "status": "Inactive" }
// 	]
// 	// ;
		

//   // IMPORTANT: You must match the cache key exactly like apiService.buildURL(endpoint, params)
//   // const fakeURL = new URL("http://127.0.0.1:5500/api/users", window.location.origin);
//   // fakeURL.searchParams.append("page", "1");
//   // fakeURL.searchParams.append("pageSize", "10");
//   // fakeURL.searchParams.append("search", "");
//   // fakeURL.searchParams.append("role", "");
// const fakeURL = apiService.buildURL("/user",{page:1,role:'Teacher',pageSize:'10',useCache:true})
//   cacheService.set(fakeURL.toString(),fakeUsers);
// 	console.log(cacheService);
// 	return fakeUsers;
// }
// AddFakeData.js
import { cacheService } from './CacheService.js';

export function addFakeDataToCache() {
  const fakeUsersPage1 = {
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    ],
    meta: { page: 1, totalPages: 1 },
  };
	const fakeUsersPage2 = {
    data: [
      { id: 1, name: 'user Page 2', email: 'john@example.com', role: 'Admin', status: 'Active' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    ],
    meta: { page: 2, totalPages: 1 },
  };
	const fakeTeachers2Page1 = {
    data: [
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
    ],
    meta: { page: 1, totalPages: 1 },
  };
	const fakeTeachers2Page2 = {
    data: [
      { id: 2, name: 'Page 2', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
    ],
    meta: { page: 2, totalPages: 1 },
  };
  cacheService.set(window.location.origin+'/api/users?page=1&pageSize=10', fakeUsersPage1);
  cacheService.set(window.location.origin+'/api/users?page=2&pageSize=10', fakeUsersPage2);
  cacheService.set(window.location.origin+'/api/users?page=1&pageSize=10&role=teacher', fakeTeachers2Page1);
  cacheService.set(window.location.origin+'/api/users?page=2&pageSize=10&role=teacher', fakeTeachers2Page2);
  cacheService.set(window.location.origin+'/api/users/1', { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' });
	console.log("from fakedata to cache : ",cacheService.get(window.location.origin+'/api/users?page=1&pageSize=10'));
	console.log("from fakedata to cache : ",cacheService.get(window.location.origin+'/api/users?page=2&pageSize=10'));
}


