// // /assets/js/components/UserManagementComponent.js

// import { apiService } from '../../services/ApiService.js';
// import { addFakeUsersToCache } from '../../services/fakeData.js';

// // addFakeUsersToCache();   // Inject fake data into cache

// export default class UserManagement {
//   constructor() {
//     // Pagination settings
//     this.pageSize = 10;
//     this.currentPage = 1;
//     // DOM elements
//     this.tableBody   = document.getElementById('userTableBody');
//     this.searchInput = document.getElementById('searchInput');
//     this.roleFilter  = document.getElementById('roleFilter');
//     this.pagination  = document.getElementById('pagination');
//     this.userForm    = document.getElementById('userForm');
//     this.deleteBtn   = document.getElementById('deleteUserBtn');
//     this.userModalEl = document.getElementById('userModal');
//     this.delModalEl  = document.getElementById('confirmDeleteModal');

//     // Track which user is pending deletion
//     this.userIdToDelete = null;
//   }

//   init() {
//     // Wire up filter & pagination events
//     // this.searchInput.addEventListener('input', () => this.loadPage(1));
//     // this.roleFilter.addEventListener('change', () => this.loadPage(1));

//     // Event delegation for edit/delete buttons in table
//     this.tableBody.addEventListener('click', e => {
//       const editBtn = e.target.closest('.edit-btn');
//       const delBtn  = e.target.closest('.delete-btn');
//       if (editBtn) this.openEditModal(editBtn.dataset.userId);
//       if (delBtn)  this.openDeleteModal(delBtn.dataset.userId);
//     }
// 		);

//     // Hook up delete confirmation
//     this.deleteBtn.addEventListener('click', () => this.confirmDelete());

//     // Hook up form submit for create/update
//     this.userForm.addEventListener('submit', e => this.handleFormSubmit(e));

//     // Initial load
//     // this.loadPage(1);
//   }

//   // Fetch one page of users from API (with caching)
//   async fetchUsers(page = 1) {
//     // const params = {
//     //   page,
//     //   pageSize: this.pageSize,
//     //   search: this.searchInput.value.trim(),
//     //   role: this.roleFilter.value
//     // };
//     // return apiService.get('/users', params, true);
// 		return addFakeUsersToCache();
//   }

//   // Load & render a specific page
//   async loadPage(page = 1) {
//     try {
//       this.currentPage = page;
//       const { data, meta } = await this.fetchUsers(page);
//       this.renderTable(data);
//       this.renderPagination(meta);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load users.');
//     }
//   }

//   // Build table rows with data-user-id on buttons
//   renderTable(users) {
//     this.tableBody.innerHTML = '';
//     if (!users.length) {
//       this.tableBody.innerHTML = `
//         <tr><td colspan="6" class="text-center text-muted">No users found.</td></tr>
//       `;
//       return;
//     }

//     users.forEach(u => {
//       const tr = document.createElement('tr');
//       tr.innerHTML = `
//         <th scope="row">${u.id}</th>
//         <td>${this._sanitize(u.name)}</td>
//         <td>${this._sanitize(u.email)}</td>
//         <td>${this._capitalize(u.role)}</td>
//         <td>
//           <span class="badge ${u.status === 'Active' ? 'bg-success' : 'bg-secondary'}">
//             ${this._capitalize(u.status)}
//           </span>
//         </td>
//         <td>
//           <button class="btn btn-sm btn-outline-secondary me-1 edit-btn"
//                   data-user-id="${u.id}">
//             <i class="bi bi-pencil"></i>
//           </button>
//           <button class="btn btn-sm btn-outline-danger delete-btn"
//                   data-user-id="${u.id}">
//             <i class="bi bi-trash"></i>
//           </button>
//         </td>
//       `;
//       this.tableBody.appendChild(tr);
//     });
//   }

//   // Build pagination controls
//   renderPagination(meta) {
//     this.pagination.innerHTML = '';

//     const makeItem = (label, page, disabled, active) => {
//       const li = document.createElement('li');
//       li.className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
//       const a = document.createElement('a');
//       a.className = 'page-link';
//       a.href      = '#';
//       a.textContent = label;
//       a.onclick = e => {
//         e.preventDefault();
//         if (!disabled && !active) this.loadPage(page);
//       };
//       li.appendChild(a);
//       return li;
//     };

//     // Prev
//     this.pagination.appendChild(makeItem('Prev', meta.page - 1, meta.page === 1, false));
//     // Pages
//     for (let p = 1; p <= meta.totalPages; p++) {
//       this.pagination.appendChild(makeItem(p, p, false, p === meta.page));
//     }
//     // Next
//     this.pagination.appendChild(makeItem('Next', meta.page + 1, meta.page === meta.totalPages, false));
//   }

//   // Open edit modal and populate form
//   async openEditModal(userId) {
//     try {
//       const user = await apiService.get(`/users/${userId}`);
//       document.getElementById('userId').value    = user.id;
//       document.getElementById('userName').value  = user.name;
//       document.getElementById('userEmail').value = user.email;
//       document.getElementById('userRole').value  = user.role;
//       document.getElementById('passwordField').style.display = 'none';
//       document.getElementById('userModalLabel').textContent = 'Edit User';

//       new bootstrap.Modal(this.userModalEl).show();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load user details.');
//     }
//   }

//   // Open delete confirmation modal
//   openDeleteModal(userId) {
//     this.userIdToDelete = userId;
//     new bootstrap.Modal(this.delModalEl).show();
//   }

//   // Confirm delete, call API, refresh page
//   async confirmDelete() {
//     if (!this.userIdToDelete) return;
//     try {
//       await apiService.delete(`/users/${this.userIdToDelete}`);
//       apiService.invalidateCache('/users', { // clear list cache
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

//   // Handle form submission for both create & update
//   async handleFormSubmit(e) {
//     e.preventDefault();

//     const idField = document.getElementById('userId');
//     const payload = {
//       name:   document.getElementById('userName').value.trim(),
//       email:  document.getElementById('userEmail').value.trim(),
//       role:   document.getElementById('userRole').value,
//       status: document.getElementById('userStatus').checked ? 'Active' : 'Inactive'
//     };

//     try {
//       if (idField.value) {
//         // Update
//         await apiService.put(`/users/${idField.value}`, payload);
//       } else {
//         // Create
//         payload.password = document.getElementById('userPassword').value;
//         await apiService.post('/users', payload);
//       }
//       new bootstrap.Modal(this.userModalEl).hide();
//       apiService.invalidateCache('/users', {
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
//       document.getElementById('passwordField').style.display = '';
//     }
//   }

//   // Helpers
//   _capitalize(str = '') {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }
//   _sanitize(str = '') {
//     const d = document.createElement('div');
//     d.textContent = str;
//     return d.innerHTML;
//   }
// }









// // test **********************************************************

// UserManagementComponent.js
import { apiService } from '../../services/ApiService.js';

export default class UserManagement {
  constructor() {
    this.pageSize = 10;
    this.currentPage = 1;

    this.tableBody = document.getElementById('userTableBody');
    this.searchInput = document.getElementById('searchInput');
    this.roleFilter = document.getElementById('roleFilter');
    this.pagination = document.getElementById('pagination');
    this.userForm = document.getElementById('userForm');
    this.deleteBtn = document.getElementById('deleteUserBtn');
    this.userModalEl = document.getElementById('userModal');
    this.delModalEl = document.getElementById('confirmDeleteModal');

    this.userIdToDelete = null;
  }

  init() {
    this.searchInput.addEventListener('input', () => this.loadPage(1));
    this.roleFilter.addEventListener('change', () => this.loadPage(1));

    this.tableBody.addEventListener('click', e => {
      const editBtn = e.target.closest('.edit-btn');
      const delBtn = e.target.closest('.delete-btn');
			// open edit form from the button for each row indepandently
      if (editBtn) this.openEditModal(editBtn.dataset.userId);
			// open delete form from the button for each row indepandently
      if (delBtn) this.openDeleteModal(delBtn.dataset.userId);
    });
		// delete form submission
    this.deleteBtn.addEventListener('click', () => this.confirmDelete());
		//update or create form submission
    this.userForm.addEventListener('submit', e => this.handleFormSubmit(e));

    this.loadPage(1);
  }

  async fetchUsers(page = 1) {
    const params = {
      page,
      pageSize: this.pageSize || 10,
      search: this.searchInput.value.trim()|| '',
      role: this.roleFilter.value || ''
    };
    return apiService.fetchUsers(params, true);
  }

  async loadPage(page = 1) {
    try {
      this.currentPage = page;
      const { data, meta } = await this.fetchUsers(page);
      this.renderTable(data);
      this.renderPagination(meta);
    } 
		catch (err) {
      console.error(err);
      // alert('Failed to load users.');
    }
  }

  renderTable(users) {
    this.tableBody.innerHTML = '';
    if (!users.length) {
      this.tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No users found.</td></tr>`;
      return;
    }

    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <th scope="row">${u.id}</th>
        <td>${this._sanitize(u.name)}</td>
        <td>${this._sanitize(u.email)}</td>
        <td>${this._capitalize(u.role)}</td>
        <td>
          <span class="badge ${u.status === 'Active' ? 'bg-success' : 'bg-secondary'}">
            ${this._capitalize(u.status)}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline-secondary me-1 edit-btn" data-user-id="${u.id}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger delete-btn" data-user-id="${u.id}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      this.tableBody.appendChild(tr);
    });
  }

  renderPagination(meta) {
    this.pagination.innerHTML = '';

    const makeItem = (label, page, disabled, active) => {
      const li = document.createElement('li');
      li.className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = label;
      a.onclick = e => {
        e.preventDefault();
        if (!disabled && !active) this.loadPage(page);
      };
      li.appendChild(a);
      return li;
    };

    this.pagination.appendChild(makeItem('Prev', meta.page - 1, meta.page === 1, false));
    for (let p = 1; p <= meta.totalPages; p++) {
      this.pagination.appendChild(makeItem(p, p, false, p === meta.page));
    }
    this.pagination.appendChild(makeItem('Next', meta.page + 1, meta.page === meta.totalPages, false));
  }

  async openEditModal(userId) {
    try {
      const user = await apiService.fetchUserById(userId);
      document.getElementById('userId').value = user.id;
      document.getElementById('userName').value = user.name;
      document.getElementById('userEmail').value = user.email;
      document.getElementById('userRole').value = user.role;
      document.getElementById('passwordField').style.display = 'none';
      document.getElementById('userModalLabel').textContent = 'Edit User';
      new bootstrap.Modal(this.userModalEl).show();
    } catch (err) {
      console.error(err);
      alert('Failed to load user details.');
    }
  }

  openDeleteModal(userId) {
    this.userIdToDelete = userId;
    new bootstrap.Modal(this.delModalEl).show();
  }

  async confirmDelete() {
    if (!this.userIdToDelete) return;
    try {
      await apiService.deleteUser(this.userIdToDelete);
      apiService.invalidateCache('/users', {
        page: this.currentPage,
        pageSize: this.pageSize,
        search: this.searchInput.value.trim(),
        role: this.roleFilter.value
      });
      new bootstrap.Modal(this.delModalEl).hide();
      this.loadPage(this.currentPage);
    } catch (err) {
      console.error(err);
      alert('Failed to delete user.');
    } finally {
      this.userIdToDelete = null;
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    const idField = document.getElementById('userId');
    const payload = {
      name: document.getElementById('userName').value.trim(),
      email: document.getElementById('userEmail').value.trim(),
      role: document.getElementById('userRole').value,
      status: document.getElementById('userStatus').checked ? 'Active' : 'Inactive'
    };

    try {
      if (idField.value) {
				// user exist on the table
        await apiService.updateUser(idField.value, payload);
      } else {
				// user doesn't exist on the table ==> new one
        payload.password = document.getElementById('userPassword').value;
        await apiService.createUser(payload);
      }
      new bootstrap.Modal(this.userModalEl).hide();
      apiService.invalidateCache('/users', {
        page: this.currentPage,
        pageSize: this.pageSize,
        search: this.searchInput.value.trim(),
        role: this.roleFilter.value
      });
      this.loadPage(this.currentPage);
    } catch (err) {
      console.error(err);
      alert('Failed to save user.');
    } finally {
      this.userForm.reset();
      document.getElementById('passwordField').style.display = '';
    }
  }

  _capitalize(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _sanitize(str = '') {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
