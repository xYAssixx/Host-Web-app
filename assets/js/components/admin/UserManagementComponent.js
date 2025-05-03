// /assets/js/components/userManagementComponent.js
import { apiService } from '../../services/ApiService.js';
import { formValidation } from '../../services/Utils.js';
export default class UserManagement {
  constructor() {
    this.pageSize = 10;
    this.currentPage = 1;

    // DOM elements
    this.tableBody = document.querySelector('#userManagement #userTableBody');
    this.searchInput = document.querySelector('#userManagement #searchInput');
    this.roleFilter = document.querySelector('#userManagement #roleFilter');
    this.pagination = document.querySelector('#userManagement #pagination');
    this.userForm = document.querySelector('#userManagement #userForm');
    this.userModalEl = document.querySelector('#userManagement #userModal');
    this.deleteBtn = document.querySelector('#userManagement #deleteUserBtn');
    this.delModalEl = document.querySelector('#userManagement #confirmDeleteModal');
		this.actModalEl = document.querySelector('#userManagement #confirmActivateModal');
		this.activateBtn = document.querySelector('#userManagement #activateUserBtn');
		
    this.userId1 = null;
  }

  init() {
    this.searchInput.addEventListener('input', () => this.loadPage(1, true));
    this.roleFilter.addEventListener('change', () => this.loadPage(1, true));
		
    this.tableBody.addEventListener('click', e => {
      if (e.target.closest('.edit-btn')) {
        this.openEditModal(e.target.closest('.edit-btn').dataset.userId);
      }
      if (e.target.closest('.delete-btn')) {
        this.openDeleteModal(e.target.closest('.delete-btn').dataset.userId);
      }
			if(e.target.closest('.active-btn')){
        this.openActivateModal(e.target.closest('.active-btn').dataset.userId);
			}
    });

    this.deleteBtn.addEventListener('click', () => this.confirmDelete());
    this.userForm.addEventListener('submit', e =>{
			 if(formValidation(userForm,e)){
						return;
					}
		 this.handleFormSubmit(e);
		});
		this.activateBtn.addEventListener('click',()=>this.confirmActivate());

    this.loadPage(1, true);
  }

  async fetchUsersPage(page = 1, useCache = true) {
    const all = await apiService.fetchUsers({}, useCache);
    const filter = this.roleFilter.value;
    let term = this.searchInput.value;
    let filtered;
		if(filter){
			filtered = all.filter(u =>
				(u.role.includes(filter) && u.name.toLowerCase().includes(term.toLowerCase()))
			)
		}else{
			term = term.toLowerCase()
			filtered = all.filter(u => u.name.toLowerCase().includes(term.toLowerCase())
			);}
    const totalPages = Math.ceil(filtered.length / this.pageSize) || 1;
    const start = (page - 1) * this.pageSize;
    const pageData = filtered.slice(start, start + this.pageSize);

    return { data: pageData, meta: { page, totalPages } };
  }

  async loadPage(page = 1, useCache = true) {
    try {
      this.currentPage = page;
      const { data, meta } = await this.fetchUsersPage(page, useCache);
      this.renderTable(data);
      this.renderPagination(meta.page, meta.totalPages);
    } catch (err) {
      console.error(err);
      alert('Failed to load users.');
    }
  }

  renderTable(users) {
    this.tableBody.innerHTML = '';
    if (users.length === 0) {
      this.tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No users found.</td></tr>`;
      return;
    }
    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <th scope="row">${u.id}</th>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td class="text-center">
          <button data-user-id="${u.id}" class="badge btn ${u.status==="Inactive" ? "active-btn":""}  ${u.status === 'Active' ? 'bg-success' :'bg-danger'}">
            ${u.status}
          </button>
        </td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-secondary edit-btn"
                  data-user-id="${u.id}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger delete-btn"
                  data-user-id="${u.id}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      this.tableBody.appendChild(tr);
    });
  }

  renderPagination(current, total) {
    this.pagination.innerHTML = '';
    const mk = (label, p, disabled, active) => {
      const li = document.createElement('li');
      li.className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = label;
      a.onclick = e => {
        e.preventDefault();
        if (!disabled && !active) this.loadPage(p, true);
      };
      li.appendChild(a);
      return li;
    };
    this.pagination.appendChild(mk('Prev', current - 1, current === 1, false));
    for (let p = 1; p <= total; p++) {
      this.pagination.appendChild(mk(p, p, false, p === current));
    }
    this.pagination.appendChild(mk('Next', current + 1, current === total, false));
  }

  async openEditModal(id) {
    try {
      const [user] = await apiService.fetchUserById(id);
console.log(user)
      document.querySelector('#userManagement #userId').value = user.id;
      document.querySelector('#userManagement #userName').value = user.name;
      document.querySelector('#userManagement #userEmail').value = user.email;
      document.querySelector('#userManagement #userRole').value = user.role;
      // user.status ==="Active"? document.querySelector('#userManagement #userStatus').checked:document.querySelector('#userManagement #userStatus').;
      document.querySelector('#userManagement #userModalLabel').textContent = 'Edit User';
      new bootstrap.Modal(this.userModalEl).show();
    } catch (err) {
      console.error(err);
      alert('Cannot load user for editing.');
    }
  }

  openDeleteModal(id) {
    this.userId1 = id;
    new bootstrap.Modal(this.delModalEl).show();
  }
	openActivateModal(id) {
    this.userId1 = id;
    new bootstrap.Modal(this.actModalEl).show();
  }
  async confirmDelete() {
    if (!this.userId1) return;
    try {
      await apiService.deleteUser(this.userId1);
      new bootstrap.Modal(this.delModalEl).hide();
      this.loadPage(this.currentPage, false);
			//add success notif
    } catch {
      alert('Delete failed.');
    }
    this.userId1 = null;
  }
	async confirmActivate() {
    if (!this.userId1) return;
    try {
      await apiService.activateUser(this.userId1);
      new bootstrap.Modal(this.actModalEl).hide();
      this.loadPage(this.currentPage, false);
			//add success notif
    } catch {
      alert('Activation failed.');
    }
    this.userId1 = null;
  }
  async handleFormSubmit(e) {
    e.preventDefault();
    const id = document.querySelector('#userManagement #userId').value;
    const dto = {
      name: document.querySelector('#userManagement #userName').value,
      email: document.querySelector('#userManagement #userEmail').value,
      role: document.querySelector('#userManagement #userRole').value,
      status: document.querySelector('#userManagement #userStatus').value,
    };
    try {
      if (id) {
        await apiService.updateUser(id, dto);
      } else {
        await apiService.createUser(dto);
      }
      new bootstrap.Modal(this.userModalEl).hide();
      this.loadPage(this.currentPage, false);
			//add success notif
    } catch {
      alert('Save failed.');
    }
    this.userForm.reset();
  }
}
