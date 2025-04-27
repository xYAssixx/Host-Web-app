// // import { cacheService } from './CacheService.js'; // << Import the centralized cache

// // class ApiService {
// //   constructor(baseURL = '/api') {
// //     this.baseURL = baseURL;
// //   }

// //   buildURL(endpoint, params = {}) {
// //     const url = new URL(this.baseURL + endpoint, window.location.origin);
// //     Object.keys(params).forEach(key => {
// //       if (params[key] !== undefined && params[key] !== '') {
// //         url.searchParams.append(key, params[key]);
// //       }
// //     });
// //     return url.toString();
// //   }

// //   async get(endpoint, params = {}, useCache = true) {
// //     const url = this.buildURL(endpoint, params);

// //     if (useCache && cacheService.has(url)) {
// //       return cacheService.get(url);
// //     }

// //     const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
// //     if (!res.ok) throw new Error(`GET ${url} failed`);
// //     const data = await res.json();

// //     if (useCache) {
// //       cacheService.set(url, data);
// //     }
// //     return data;
// //   }

// //   async post(endpoint, body = {}) {
// //     const res = await fetch(this.baseURL + endpoint, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(body)
// //     });
// //     if (!res.ok) throw new Error(`POST ${endpoint} failed`);
// //     return res.json();
// //   }

// //   async put(endpoint, body = {}) {
// //     const res = await fetch(this.baseURL + endpoint, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(body)
// //     });
// //     if (!res.ok) throw new Error(`PUT ${endpoint} failed`);
// //     return res.json();
// //   }

// //   async delete(endpoint) {
// //     const res = await fetch(this.baseURL + endpoint, { method: 'DELETE' });
// //     if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
// //     return res.json();
// //   }

// //   // Cache management methods
// //   clearCache() {
// //     cacheService.clear();
// //   }

// //   invalidateCache(endpoint, params = {}) {
// //     const url = this.buildURL(endpoint, params);
// //     cacheService.delete(url);
// //   }
// // }

// // // Export a single instance
// // export const apiService = new ApiService();

// // /assets/js/services/ApiService.js

// import { cacheService } from "./CacheService.js";

// /**
//  * ApiService handles RESTful API interactions with optional caching,
//  * and provides convenience methods for user-specific endpoints.
//  */
// class ApiService {
//   /**
//    * @param {string} baseURL - Base URL for API endpoints
//    */
//   constructor(baseURL = "/api") {
//     this.baseURL = baseURL;
//   }

//   /**
//    * Builds a full URL string including query parameters.
//    * @param {string} endpoint
//    * @param {Object} params
//    * @returns {string}
//    */
//   buildURL(endpoint, params = {}) {
//     const url = new URL(this.baseURL + endpoint, window.location.origin);
//     Object.entries(params).forEach(([key, value]) => {
//       if (value !== undefined && value !== "") {
//         url.searchParams.append(key, value);
//       }
//     });
//     return url.toString();
//   }

//   /**
//    * Generic GET with optional caching
//    */
//   async get(endpoint, params = {}, useCache = true) {
//     const url = this.buildURL(endpoint, params);
//     if (useCache && cacheService.has(url)) {
//       return cacheService.get(url);
//     }
//     console.log("cash is empty");
//     const response = await fetch(url, {
//       headers: { Accept: "application/json" },
//     });
//     await this._assertOk(response, "GET", url);
//     const data = await response.json();
//     if (useCache) cacheService.set(url, data);
//     return data;
//   }

//   /**
//    * Generic POST
//    */
//   async post(endpoint, body = {}) {
//     const response = await fetch(this.baseURL + endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });
//     await this._assertOk(response, "POST", endpoint);
//     return response.json();
//   }

//   /**
//    * Generic PUT
//    */
//   async put(endpoint, body = {}) {
//     const response = await fetch(this.baseURL + endpoint, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });
//     await this._assertOk(response, "PUT", endpoint);
//     return response.json();
//   }

//   /**
//    * Generic DELETE
//    */
//   async delete(endpoint) {
//     const response = await fetch(this.baseURL + endpoint, { method: "DELETE" });
//     await this._assertOk(response, "DELETE", endpoint);
//     return response.json();
//   }

//   /** Clear entire cache */
//   clearCache() {
//     cacheService.clear();
//   }

//   /** Invalidate cache for a specific request */
//   invalidateCache(endpoint, params = {}) {
//     const url = this.buildURL(endpoint, params);
//     cacheService.delete(url);
//   }

//   // --- Convenience methods for /user endpoint ---

//   /**
//    * Fetch paginated list of user
//    * @param {Object} options - { page, pageSize, search, role, useCache }
//    */
//   async fetchUsers({
//     page = 1,
//     pageSize = 10,
//     search = "",
//     role = "",
//     useCache = true,
//   } = {}) {
//     return this.get("/user", { page, pageSize, search, role }, useCache);
//   }

//   /**
//    * Fetch a single user by ID
//    */
//   async getUser(id, useCache = true) {
//     return this.get(`/user/${id}`, {}, useCache);
//   }

//   /**
//    * Create a new user
//    */
//   async createUser(data) {
//     return this.post("/user", data);
//   }

//   /**
//    * Update an existing user
//    */
//   async updateUser(id, data) {
//     return this.put(`/user/${id}`, data);
//   }

//   /**
//    * Delete a user by ID
//    */
//   async deleteUser(id) {
//     return this.delete(`/user/${id}`);
//   }

//   /**
//    * Assert HTTP response OK, otherwise throw descriptive error
//    */
//   async _assertOk(response, method, target) {
//     if (!response.ok) {
//       const text = await response.text().catch(() => response.statusText);
//       throw new Error(`${method} ${target} failed: ${response.status} ${text}`);
//     }
//   }
// }

// // Export singleton instance
// export const apiService = new ApiService();



// ApiService.js
import { cacheService } from './CacheService.js';

class ApiService {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  buildURL(endpoint, params = {}) {
    const url = new URL(this.baseURL + endpoint, window.location.origin);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        url.searchParams.append(key, params[key]);
      }
    });
		console.log("from buildURL",url.toString())
    return url.toString();
  }

  async get(endpoint, params = {}, useCache = true) {
    const url = this.buildURL(endpoint, params);
		console.log("url from Apiservie.get",url);
		console.log("params from ApiService.get",params);
    if (useCache && cacheService.has(url)) {
      return cacheService.get(url);
    }
		console.log("no cache from get ApiService.js")
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`GET ${url} failed`);
    const data = await res.json();

    if (useCache) {
      cacheService.set(url, data);
    }
    return data;
  }

  async post(endpoint, params = {}) {
    const res = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error(`POST ${endpoint} failed`);
    return res.json();
  }

  async put(endpoint, params = {}) {
    const res = await fetch(this.baseURL + endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error(`PUT ${endpoint} failed`);
    return res.json();
  }

  async delete(endpoint) {
    const res = await fetch(this.baseURL + endpoint, { method: 'DELETE' });
    if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
    return res.json();
  }

  // Cache utilities
  clearCache() {
    cacheService.clear();
  }

  invalidateCache(endpoint, params = {}) {
    const url = this.buildURL(endpoint, params);
    cacheService.delete(url);
  }

  // User specific API methods
  async fetchUsers(params = {}, useCache = true) {
    return this.get('/users', params, useCache);
  }

  async fetchUserById(id) {
    return this.get(`/users/${id}`);
  }

  async createUser(userData) {
    return this.post('/users', userData);
  }

  async updateUser(id, userData) {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id) {
    return this.delete(`/users/${id}`);
  }
}

export const apiService = new ApiService();
