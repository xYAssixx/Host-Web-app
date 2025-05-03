import { cacheService } from "../services/CacheService.js";

export function addFakeDataToCache() {

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

	cacheData(window.location.origin + '/assets/data/Student.json','/api/Student');// fetch all students
	cacheData(window.location.origin + '/assets/data/Student1.json','/api/Student/1');//fetch student that has id = 1
	cacheData(window.location.origin + '/assets/data/Class4A1.json','/api/Student/4Y1');//fetch student of 4A1 class
	cacheData(window.location.origin + '/assets/data/User.json','/api/User');// fetch all users
	cacheData(window.location.origin + '/assets/data/User1.json','/api/User/1');//fetch User that has id = 1
	cacheData(window.location.origin + '/assets/data/Class.json','/api/Class');// fetch all classes
	cacheData(window.location.origin + '/assets/data/Class1.json','/api/Class/1');//fetch Class that has id = 1
	cacheData(window.location.origin + '/assets/data/Attendance1.json','/api/Student/1/attendance');//fetch
	cacheData(window.location.origin + '/assets/data/Behavior1.json','/api/Student/1/behavior-reports');//fetch
	cacheData(window.location.origin + '/assets/data/Bill1.json','/api/Student/1/bills');//fetch
	
	
	console.log(cacheService)
}	


