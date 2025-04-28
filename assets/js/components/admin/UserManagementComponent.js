// // // /assets/js/components/UserManagementComponent.js
// // UserManagementComponent.js
// import { apiService } from '../../services/ApiService.js';

// export default class UserManagement {
//   constructor() {
//     this.pageSize = 10;
//     this.currentPage = 1;

//     this.tableBody = document.querySelector('#userManagement #userTableBody');
//     this.searchInput = document.querySelector('#userManagement #searchInput');
//     this.roleFilter = document.querySelector('#userManagement #roleFilter');
//     this.pagination = document.querySelector('#userManagement #pagination');
//     this.userForm = document.querySelector('#userManagement #userForm');
//     this.deleteBtn = document.querySelector('#userManagement #deleteUserBtn');
//     this.userModalEl = document.querySelector('#userManagement #userModal');
//     this.delModalEl = document.querySelector('#userManagement #confirmDeleteModal');

//     this.userIdToDelete = null;
//   }

//   init() {
// 		// when searching or filtering always go back to page 1
//     this.searchInput.addEventListener('input', () => this.loadPage(1));
//     this.roleFilter.addEventListener('change', () => this.loadPage(1));

//     this.tableBody.addEventListener('click', e => {
//       const editBtn = e.target.closest('.edit-btn');
//       const delBtn = e.target.closest('.delete-btn');
// 			// open edit form from the button for each row indepandently
//       if (editBtn) this.openEditModal(editBtn.dataset.userId);
// 			// open delete form from the button for each row indepandently
//       if (delBtn) this.openDeleteModal(delBtn.dataset.userId);
//     });
// 		// delete form submission
//     this.deleteBtn.addEventListener('click', () => this.confirmDelete());
// 		//update or create form submission
//     this.userForm.addEventListener('submit', e => this.handleFormSubmit(e));

//     this.loadPage(1);
//   }

//   async fetchUsers(page = 1) {
//     const params = {
//       page,
//       pageSize: this.pageSize || 10,
//       search: this.searchInput.value.trim()|| '',
//       role: this.roleFilter.value || ''
//     };
//     return apiService.fetchUsers(params, true);
//   }

//   async loadPage(page = 1) {
//     try {
//       this.currentPage = page;
//       const { data, meta } = await this.fetchUsers(page);
//       this.renderTable(data);
//       this.renderPagination(meta);
//     } 
// 		catch (err) {
//       console.error(err);
//       // alert('Failed to load users.');
//     }
//   }

//   renderTable(users) {
//     this.tableBody.innerHTML = '';
//     if (!users.length) {
//       this.tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No users found.</td></tr>`;
//       return;
//     }

//     users.forEach(u => {
//       const tr = document.createElement('tr');
//       tr.innerHTML = `
//         <th scope="row">${u.id}</th>
//         <td>${this._sanitize(u.name)}</td>
//         <td>${this._sanitize(u.email)}</td>
//         <td>${this._capitalize(u.role)}</td>
//         <td class="text-center">
//           <span class="badge ${u.status === 'Active' ? 'bg-success' : 'bg-secondary'}">
//             ${this._capitalize(u.status)}
//           </span>
//         </td>
//         <td class="text-center">
//           <button class="btn btn-sm btn-outline-secondary me-1 edit-btn" data-user-id="${u.id}">
//             <i class="bi bi-pencil"></i>
//           </button>
//           <button class="btn btn-sm btn-outline-danger delete-btn" data-user-id="${u.id}">
//             <i class="bi bi-trash"></i>
//           </button>
//         </td>
//       `;
//       this.tableBody.appendChild(tr);
//     });
//   }

//   renderPagination(meta = {page:1,totalPages:1}) {
//     this.pagination.innerHTML = '';

//     const makeItem = (label, page, disabled, active) => {
//       const li = document.createElement('li');
//       li.className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
// 			// li.innerHTML=`<a class="page-link" href="#" data-page="${page}">${label}</a>`
//       const a = document.createElement('a');
//       a.className = 'page-link';
//       a.href = '#';
// 			a.dataset.page=page;
//       a.textContent = label;
//       a.onclick = e => {
//         e.preventDefault();
// 				console.log("from pagination , page clicked",e.target.dataset.page)
//         if (!disabled && !active) this.loadPage(e.target.dataset.page);
//       };
// 			li.appendChild(a);
//       return li;
//     };
// 		// prev = page - 1  and it is always inactive and if the page = 1 it means no previous ==> disabled
//     this.pagination.appendChild(makeItem('Prev', meta.page - 1, meta.page === 1, false));
//     for (let p = 1; p <= meta.totalPages; p++) {
//       this.pagination.appendChild(makeItem(p, p, false, p === meta.page));
//     }
// 		//
//     this.pagination.appendChild(makeItem('Next', meta.page + 1, meta.page === meta.totalPages, false));
//   }

//   async openEditModal(userId) {
//     try {
//       const user = await apiService.fetchUserById(userId);
//       document.querySelector('#userManagement #userId').value = user.id;
//       document.querySelector('#userManagement #userName').value = user.name;
//       document.querySelector('#userManagement #userEmail').value = user.email;
//       document.querySelector('#userManagement #userRole').value = user.role;
//       document.querySelector('#userManagement #passwordField').style.display = 'none';
//       document.querySelector('#userManagement #userModalLabel').textContent = 'Edit User';
//       new bootstrap.Modal(this.userModalEl).show();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load user details.');
//     }
//   }

//   openDeleteModal(userId) {
//     this.userIdToDelete = userId;
//     new bootstrap.Modal(this.delModalEl).show();
//   }

//   async confirmDelete() {
//     if (!this.userIdToDelete) return;
//     try {
//       // await apiService.deleteUser(this.userIdToDelete);
//       apiService.invalidateCache('/user', {
//         page: this.currentPage,
//         pageSize: this.pageSize,
//         search: this.searchInput.value.trim(),
//         role: this.roleFilter.value
//       });
//       new bootstrap.Modal(this.delModalEl).hide();
//       this.loadPage(this.currentPage);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete user.');
//     } finally {
//       this.userIdToDelete = null;
//     }
//   }

//   async handleFormSubmit(e) {
//     e.preventDefault();

//     const idField = document.querySelector('#userManagement #userId');
//     const payload = {
//       name: document.querySelector('#userManagement #userName').value.trim(),
//       email: document.querySelector('#userManagement #userEmail').value.trim(),
//       role: document.querySelector('#userManagement #userRole').value,
//       status: document.querySelector('#userManagement #userStatus').checked ? 'Active' : 'Inactive'
//     };

//     try {
//       if (idField.value) {
// 				// user exist on the table
//         await apiService.updateUser(idField.value, payload);
//       } else {
// 				// user doesn't exist on the table ==> new one
//         payload.password = document.querySelector('#userManagement #userPassword').value;
//         await apiService.createUser(payload);
//       }
//       new bootstrap.Modal(this.userModalEl).hide();
//       apiService.invalidateCache('/user', {
//         page: this.currentPage,
//         pageSize: this.pageSize,
//         search: this.searchInput.value.trim(),
//         role: this.roleFilter.value
//       });
//       this.loadPage(this.currentPage);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save user.');
//     } finally {
//       this.userForm.reset();
//       document.querySelector('#userManagement #passwordField').style.display = '';
//     }
//   }

//   _capitalize(str = '') {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

//   _sanitize(str = '') {
//     const div = document.createElement('div');
//     div.textContent = str;
//     return div.innerHTML;
//   }
// }
import { apiService } from '../services/ApiService.js';

export default class UserManagement {
  constructor(containerId, userId) {
    this.container = document.getElementById(containerId);
    this.userId = userId;
    this.currentPage = 1;
    this.usersPerPage = 10;
  }

  async init() {
    await this.loadUsers();
  }

  async loadUsers(page = 1) {
    try {
      const users = await apiService.get(`/assets/data/users`, {}, true);
      this.users = users;
      this.currentPage = page;
      this.renderUsers();
    } catch (error) {
      console.error('❌ Failed to load users:', error);
    }
  }

  renderUsers() {
    if (!Array.isArray(this.users)) {
      console.error('❌ Invalid users data:', this.users);
      return;
    }

    const start = (this.currentPage - 1) * this.usersPerPage;
    const end = start + this.usersPerPage;
    const paginatedUsers = this.users.slice(start, end);

    this.container.innerHTML = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${paginatedUsers.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
              <td>${user.status}</td>
              <td>
                <button class="btn btn-sm btn-primary" data-action="edit" data-id="${user.id}">Edit</button>
                <button class="btn btn-sm btn-danger" data-action="delete" data-id="${user.id}">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-secondary" id="prevPage">Previous</button>
        <button class="btn btn-secondary" id="nextPage">Next</button>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.container.querySelectorAll('button[data-action="edit"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const userId = e.target.getAttribute('data-id');
        this.editUser(userId);
      });
    });

    this.container.querySelectorAll('button[data-action="delete"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const userId = e.target.getAttribute('data-id');
        this.deleteUser(userId);
      });
    });

    const prevButton = this.container.querySelector('#prevPage');
    const nextButton = this.container.querySelector('#nextPage');

    if (prevButton) prevButton.addEventListener('click', () => this.prevPage());
    if (nextButton) nextButton.addEventListener('click', () => this.nextPage());
  }

  async editUser(userId) {
    console.log(`✏️ Edit user ${userId}`);
    // Open edit form modal here or handle edit logic
  }

  async deleteUser(userId) {
    console.log(`🗑️ Delete user ${userId}`);
    try {
      await apiService.delete(`/users/${userId}`);
      await this.loadUsers(this.currentPage);
    } catch (error) {
      console.error('❌ Failed to delete user:', error);
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderUsers();
    }
  }

  async nextPage() {
    if ((this.currentPage * this.usersPerPage) < this.users.length) {
      this.currentPage++;
      this.renderUsers();
    }
  }
}
