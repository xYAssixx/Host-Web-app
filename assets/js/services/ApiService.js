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
		const url = this.buildURL(endpoint, params);
		if (cacheService.has(url)) {
			return cacheService.get(url);
		}
    const res = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
		const data= res.json();
		cacheService.set(url,data);
    if (!res.ok) throw new Error(`POST ${endpoint} failed`);
    return data;
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
		cacheService.delete(endpoint);
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

  /**************************[User management specific API methods]****************************/ 
  async fetchUsers(params ,useCache = true) {
    return this.post('/User',params, useCache);
  }

  async fetchUserById(id) {
		return this.get(`/User/${id}`);
  }

  async createUser(StudentData) {
    return this.post('/User/add', StudentData);
  }

  async updateUser(id, StudentData) {
    return this.put(`/User/update/${id}`, StudentData);
  }
	
	async activateUser(id){
		return this.put(`/User/${id}/activate`, {});
	} 

  async deleteUser(id) {
    return this.delete(`/User/delete/${id}`);
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
  /**************************[Class management specific API methods]****************************/ 
	async fetchClasses(params ,useCache = true) {
    return this.get('/Class',params, useCache);
  }

  async fetchClassById(id) {
    return this.get(`/Class/${id}`);
  }

  async createClass(ClassData) {
    return this.post('/Class/add', ClassData);
  }

  async updateClass(id, ClassData) {
    return this.put(`/Class/update/${id}`, ClassData);
  }

  async deleteClass(id) {
    return this.delete(`/Class/delete/${id}`);
  }
  /**************************[Mark Attendance specific API methods]****************************/ 
	async fetchClasses(params,useCache = true){
		return this.post('/Class',params,useCache);
	}
	async fetchStudentByClass(cls,useCache = true){
		return this.post(`/Student/${cls}`,useCache);
	}
	async submitAttendance(atd){
		return this.post('/Attendance/record',atd);
	}

  /**************************[Student Profile specific API methods]****************************/ 

	async fetchAttendance(studentId,params,useCache = true){
		return this.post(`/Student/${studentId}/attendance`)
	}
	async fetchBill(studentId,params,useCache = true){
		return this.post(`/Student/${studentId}/bills`)
	}
	async fetchBehavior(studentId,params,useCache = true){
		return this.post(`/Student/${studentId}/behavior-reports`)
	}
}
	export const apiService = new ApiService();
