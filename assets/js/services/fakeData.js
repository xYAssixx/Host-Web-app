import { cacheService } from "../services/CacheService.js"; // Adjust path if needed
// import { apiService } from '../services/ApiService.js';     // If you need to clear cache etc.

// // --- Function to add fake student to cache ---
// export function addFakestudentToCache() {
//   const fakestudent = [
// 		{ "id": 1, "name": "John Doe", "email": "john@example.com", "role": "Student", "status": "Active" },
// 		{ "id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "Teacher", "status": "Inactive" },
// 		{ "id": 3, "name": "Alice Johnson", "email": "alice@example.com", "role": "Student", "status": "Active" },
// 		{ "id": 4, "name": "Bob Brown", "email": "bob@example.com", "role": "Teacher", "status": "Inactive" },
// 		{ "id": 5, "name": "Charlie Davis", "email": "charlie@example.com", "role": "Student", "status": "Active" },
// 		{ "id": 6, "name": "Emily Clark", "email": "emily@example.com", "role": "Student", "status": "Inactive" },
// 		{ "id": 7, "name": "Franklin Lewis", "email": "franklin@example.com", "role": "Teacher", "status": "Active" },
// 		{ "id": 8, "name": "Grace Lee", "email": "grace@example.com", "role": "Student", "status": "Active" },
// 		{ "id": 9, "name": "Henry Wilson", "email": "henry@example.com", "role": "Teacher", "status": "Inactive" },
// 		{ "id": 10, "name": "Ivy Martinez", "email": "ivy@example.com", "role": "Student", "status": "Active" },
// 		{ "id": 11, "name": "Jack Taylor", "email": "jack@example.com", "role": "Student", "status": "Active" },
// 		{ "id": 12, "name": "Karen Harris", "email": "karen@example.com", "role": "Teacher", "status": "Inactive" },
// 		{ "id": 13, "name": "Liam Young", "email": "liam@example.com", "role": "Student", "status": "Active" },
// 		{ "id": 14, "name": "Mia Walker", "email": "mia@example.com", "role": "Teacher", "status": "Active" },
// 		{ "id": 15, "name": "Noah Hall", "email": "noah@example.com", "role": "Student", "status": "Inactive" }
// 	]
// 	// ;
		

//   // IMPORTANT: You must match the cache key exactly like apiService.buildURL(endpoint, params)
//   // const fakeURL = new URL("http://127.0.0.1:5500/api/student", window.location.origin);
//   // fakeURL.searchParams.append("page", "1");
//   // fakeURL.searchParams.append("pageSize", "10");
//   // fakeURL.searchParams.append("search", "");
//   // fakeURL.searchParams.append("role", "");
// const fakeURL = apiService.buildURL("/student",{page:1,role:'Teacher',pageSize:'10',useCache:true})
//   cacheService.set(fakeURL.toString(),fakestudent);
// 	console.log(cacheService);
// 	return fakestudent;
// }
// AddFakeData.js
// import { cacheService } from './CacheService.js';

export function addFakeDataToCache() {
// 	const fakeUserPage1 = {
//     data: [
//       { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//     ],
//     meta: { page: 1, totalPages: 5 },
//   };
// 	const fakeAdminPage1 = {
//     data: [
//       { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Inactive' },
			
//     ],
//     meta: { page: 1, totalPages: 1 },
//   };
// 	const fakeUserPage2 = {
//     data: [
//       { id: 1, name: 'student Page 2', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//     ],
//     meta: { page: 2, totalPages:  5},
//   };
// 	const fakeUserPage3 = {
//     data: [
//       { id: 1, name: 'student Page 3', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//     ],
//     meta: { page: 3, totalPages: 5 },
//   };
// 	const fakeUserPage4 = {
//     data: [
//       { id: 1, name: 'student Page 4', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//     ],
//     meta: { page: 4, totalPages: 5},
//   };
// 	const fakeUserPage5 = {
//     data: [
//       { id: 1, name: 'student Page 5', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//     ],
//     meta: { page: 5, totalPages: 5 },
//   };
// 	const fakeTeachersPage1 = {
//     data: [
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
// 			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
// 			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
//     ],
//     meta: { page: 1, totalPages: 2},
//   };
// 	const fakeTeachersPage2 = {
//     data: [
//       { id: 2, name: 'Page 2', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
// 			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
// 			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
//     ],
//     meta: { page: 2, totalPages: 2 },
//   };
	
// 	const fakeParentPage1 = {
//     data: [
//       { id: 2, name: 'Page 1', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Parent', status: 'Active' },
// 			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Parent', status: 'Active' },
// 			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Parent', status: 'Active' },
//     ],
//     meta: { page: 1, totalPages: 2 },
//   };
// 	const fakeParentPage2 = {
//     data: [
//       { id: 2, name: 'Page 2', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//       { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
// 			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Parent', status: 'Active' },
// 			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Parent', status: 'Inactive' },
//     ],
//     meta: { page: 2, totalPages: 2 },
//   };

// 	const fakeUser = {data:[{ id: 2, name: 'Little Houcem', email: 'Hc@example.com', role: 'Parent', status: 'Inactive'}],meta:{page:1,totalPages:1}}
//   cacheService.set(window.location.origin+'/api/user?page=1&pageSize=10&role=admin', fakeAdminPage1);
//   cacheService.set(window.location.origin+'/api/user?page=1&pageSize=10', fakeUserPage1);
//   cacheService.set(window.location.origin+'/api/user?page=2&pageSize=10', fakeUserPage2);
//   cacheService.set(window.location.origin+'/api/user?page=3&pageSize=10', fakeUserPage3);
//   cacheService.set(window.location.origin+'/api/user?page=4&pageSize=10', fakeUserPage4);
//   cacheService.set(window.location.origin+'/api/user?page=5&pageSize=10', fakeUserPage5);
//   cacheService.set(window.location.origin+'/api/user?page=1&pageSize=10&role=teacher', fakeTeachersPage1);
//   cacheService.set(window.location.origin+'/api/user?page=2&pageSize=10&role=teacher', fakeTeachersPage2);
//   cacheService.set(window.location.origin+'/api/user?page=1&pageSize=10&role=parent', fakeParentPage1);
//   cacheService.set(window.location.origin+'/api/user?page=2&pageSize=10&role=parent', fakeParentPage2);
//   cacheService.set(window.location.origin+'/api/user?page=1&pageSize=10&search=Little+Houcem', fakeUser);
//   cacheService.set(window.location.origin+'/api/user/1', { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' });


	// /Student management /
	// async function cacheStudent() {


  // try {
	// 	const url = 'http://127.0.0.1:5500/assets/data/Students.json';
  //   const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  //   if (!res.ok) throw new Error(`Failed to load ${url}`);
    
  //   const usersArray = await res.json();    // Parse to JavaScript array

  //   // Now store into cache under a chosen key (example: 'users_full')
  //   cacheService.set('/api/Student/', usersArray);

  // } catch (error) {
  //   console.error('❌ Error loading fake users:', error);
  // }
	// }

	async function cacheData(url,endpoint) {
		try {
			const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
			if (!res.ok) throw new Error(`Failed to load data from ${url}`);
			const data = await res.json();
			cacheService.set(window.location.origin+endpoint, data);
		} catch (error) {
			console.error('❌ Error caching data:', error);
		}
	}

	cacheData('http://127.0.0.1:5500/assets/data/Student.json','/api/Student');
	cacheData('http://127.0.0.1:5500/assets/data/User.json','/api/User');
	console.log(cacheService)
}	


