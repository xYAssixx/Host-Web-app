import { cacheService } from './CacheService.js';

class ApiService {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }
/*************************[Global methods]******************************/ 
  buildURL(endpoint, params = {}) {
    const url = new URL(this.baseURL + endpoint, window.location.origin);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        url.searchParams.append(key, params[key]);
      }
    });
    return url.toString();
  }

  async get(endpoint, params = {}, useCache = true) {
    const url = this.buildURL(endpoint, params);
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
		cacheService.delete(endpoint);
  }

  // Cache utilities
  clearCache() {
    cacheService.clear();
  }

  invalidateCache(endpoint, params = {}) {
    const url = this.buildURL(endpoint, params);
    cacheService.delete(url);
  }

  /**************************[User management specific API methods]****************************/ 
  async fetchUsers(params = {}, useCache = true) {
    return this.get('/user', params, useCache);
  }

  async fetchUserById(id) {
    return this.get(`/user/${id}`);
  }

  async createUser(userData) {
    return this.post('/user', userData);
  }

  async updateUser(id, userData) {
    return this.put(`/user/${id}`, userData);
  }

  async deleteUser(id) {
    return this.delete(`/user/${id}`);
  }
  /**************************[Student management specific API methods]****************************/ 

	
	async fetchStudents(params ,useCache = true) {
    return this.get('/Student',params, useCache);
  }

  async fetchStudentById(id) {
    return this.get(`/Student/${id}`);
  }

  async createStudent(StudentData) {
    return this.post('/Student/add', StudentData);
  }

  async updateStudent(id, StudentData) {
    return this.put(`/Student/update/${id}`, StudentData);
  }

  async deleteStudent(id) {
    return this.delete(`/Student/delete/${id}`);
  }
	
	


}
	export const apiService = new ApiService();
