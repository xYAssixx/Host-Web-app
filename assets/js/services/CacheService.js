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
  clear(key) {
    this.cache.delete(key);
  }

  // Clear all cache data
  clearAll() {
    this.cache.clear();
  }
}
// Export a single instance
export const cacheService = new CacheService();
