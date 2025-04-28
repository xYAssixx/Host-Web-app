// /assets/js/services/CacheService.js

// class CacheService {
//   constructor() {
//     this.cache = new Map();
//   }

//   get(key) {
//     return this.cache.get(key);
//   }

//   set(key, value) {
//     this.cache.set(key, value);
//   }

// has(key) {
//   return this.cache.has(key);
// }

//   delete(key) {
//     this.cache.delete(key);
//   }

//   clear() {
//     this.cache.clear();
//   }
// }
class CacheService {
  constructor() {
    this.cache = new Map();
  }

  // Get data from cache
  get(key) {
    return this.cache.has(key) ? this.cache.get(key) : null;
  }

  // Set data to cache
  set(key, value) {
    this.cache.set(key, value);
  }
  // verify if data exist
  has(key) {
    return this.cache.has(key);
  }
  // Clear the cache for a specific key
  delete(key) {
    this.cache.delete(key);
  }

  // Clear all cache data
  clearAll() {
    this.cache.clear();
  }
	async cacheData(url) {
		try {
			const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
	
			if (!res.ok) throw new Error(`Failed to load data from ${url}`);
	
			const data = await res.json();
	
			// Create a clean cache key by removing ".json"
			const cacheKey = url.replace(/\.json$/, '');
	
			cacheService.set(cacheKey, data);
	
			console.log(`✅ Cached: ${cacheKey}`, data);
	
		} catch (error) {
			console.error('❌ Error caching data:', error);
		}
	}	
}
// Export a single instance
export const cacheService = new CacheService();
