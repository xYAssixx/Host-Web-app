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

	cacheData('http://127.0.0.1:5500/assets/data/Student.json','/api/Student');
	cacheData('http://127.0.0.1:5500/assets/data/User.json','/api/User');
	console.log(cacheService)
}	


