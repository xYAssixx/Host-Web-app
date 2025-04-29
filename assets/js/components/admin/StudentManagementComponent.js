// /assets/js/components/studentManagementComponent.js
import { apiService } from '../../services/ApiService.js';

export default class StudentManagement {
  constructor() {
    this.pageSize    = 10;
    this.currentPage = 1;

    // DOM elements
    this.tableBody   = document.querySelector('#studentManagement #studentTableBody');
    this.searchInput = document.querySelector('#studentManagement #StuSearchInput');
    this.searchFilter  = document.querySelector('#studentManagement #searchFilter');
    this.pagination  = document.querySelector('#studentManagement #pagination');
    this.studentForm    = document.querySelector('#studentManagement #studentForm');
    this.deleteBtn   = document.querySelector('#studentManagement #deletestudentBtn');
    this.studentModalEl = document.querySelector('#studentManagement #studentModal');
    this.delModalEl  = document.querySelector('#studentManagement #confirmDeleteModal');
    this.studentIdToDelete = null;
  }

  init() {
    // Wire up search & filter
    this.searchInput.addEventListener('input',  () => this.loadPage(1,true));
    this.searchFilter.addEventListener('change', () => this.loadPage(1,true));

    // Delegate edit/delete button clicks
    this.tableBody.addEventListener('click', e => {
      if (e.target.closest('.edit-btn')) {
        this.openEditModal(e.target.closest('.edit-btn').dataset.studentId);
      }
      if (e.target.closest('.delete-btn')) {
        this.openDeleteModal(e.target.closest('.delete-btn').dataset.studentId);
      }
    });

    // Hook modals & form
    this.deleteBtn.addEventListener('click', () => this.confirmDelete());
    this.studentForm .addEventListener('submit', e => this.handleFormSubmit(e));

    // First load
    this.loadPage(1,true);
  }
  async fetchstudentsPage(page = 1,useCache=true) {
    const all = await apiService.fetchStudents({},useCache);

    // Apply search + role filter
		const filter = this.searchFilter.value;
		let term = this.searchInput.value;
		let filtered;
		if(filter==='Id'&& term){
			filtered = all.filter(u =>
				(u.id==term)
			);
		}else{
			term = term.toLowerCase()
			filtered = all.filter(u =>
				(!term || u.firstName.toLowerCase().includes(term) || u.lastName.toLowerCase().includes(term)|| (u.lastName+u.firstNameName).toLowerCase().includes(term))
			);
		}
    

    // Compute pagination manually
    const totalPages = Math.ceil(filtered.length / this.pageSize) || 1;
    const start = (page - 1) * this.pageSize;
    const pageData = filtered.slice(start, start + this.pageSize);

    return { data: pageData, meta: { page, totalPages } };
  }

  async loadPage(page = 1,useCache=true) {
    try {
      this.currentPage = page;
      const { data, meta } = await this.fetchstudentsPage(page,useCache);
      this.renderTable(data);
      this.renderPagination(meta.page, meta.totalPages);
    } catch (err) {
      console.error(err);
      alert('Failed to load students.');
    }
  }

  renderTable(students) {
    this.tableBody.innerHTML = '';
    if (students.length === 0) {
      this.tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No students found.</td></tr>`;
      return;
    }
    students.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <th scope="row">${u.id}</th>
        <td>${u.firstName} ${u.lastName}</td>
        <td>${u.parentId}</td>
        <td>${u.class}</td>
        <td class="text-center">
          <span class="badge ${u.paymentStatus==='Paid'?'bg-success':u.paymentStatus==='Pending'?'bg-info':'bg-danger'}">
            ${u.paymentStatus}
          </span>
        </td>
        <td  class="text-center ">
          <button class="btn btn-sm btn-outline-secondary edit-btn"
                  data-student-id="${u.id}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger delete-btn"
                  data-student-id="${u.id}">
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
      li.className = `page-item ${disabled?'disabled':''} ${active?'active':''}`;
      const a = document.createElement('a');
      a.className = 'page-link'; a.href = '#'; a.textContent = label;
      a.onclick = e => {
        e.preventDefault();
        if (!disabled && !active) this.loadPage(p,true);
      };
      li.appendChild(a);
      return li;
    };
    this.pagination.appendChild(mk('Prev', current-1, current===1, false));
    for (let p=1; p<=total; p++) {
      this.pagination.appendChild(mk(p, p, false, p===current));
    }
    this.pagination.appendChild(mk('Next', current+1, current===total, false));
  }

  async openEditModal(id) {
    try {
      const student = await apiService.fetchStudentById(id);
      document.querySelector('#studentManagement #studentId').value    = student.id;
      document.querySelector('#studentManagement #studentFirstName').value  = student.firstName;
      document.querySelector('#studentManagement #studentLastName').value = student.lastName;
      document.querySelector('#studentManagement #studentClass').value  = student.class;
      document.querySelector('#studentManagement #paymentStatus').value  = student.paymentStatus;
      document.querySelector('#studentManagement #parentId').value  = student.parentId;
      document.querySelector('#studentManagement #studentModalLabel').textContent = 'Edit student';
      new bootstrap.Modal(this.studentModalEl).show();
    } catch (err) {
      console.error(err);
      alert('Cannot load student for editing.');
    }
  }

  openDeleteModal(id) {
    this.studentIdToDelete = id;
    new bootstrap.Modal(this.delModalEl).show();
  }

  async confirmDelete() {
    if (!this.studentIdToDelete) return;
    try {
      await apiService.deleteStudent(this.studentIdToDelete);
      new bootstrap.Modal(this.delModalEl).hide();
      this.loadPage(this.currentPage,false);
    } catch {
      alert('Delete failed.');
    }
    this.studentIdToDelete = null;
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const id  = document.querySelector('#studentManagement #studentId').value;
    const dto = {
			firstName:document.querySelector('#studentManagement #studentFirstName').value ,
      lastName:document.querySelector('#studentManagement #studentLastName').value ,
      class:document.querySelector('#studentManagement #studentClass').value  ,
      paymentStatus:document.querySelector('#studentManagement #paymentStatus').value ,
      parentId:document.querySelector('#studentManagement #parentId').value,
    };
    try {
      if (id) {
        await apiService.updateStudent(id, dto);
      } else {
        await apiService.createStudent(dto);
      }
      new bootstrap.Modal(this.studentModalEl).hide();
      this.loadPage(this.currentPage,false);
    } catch {
      alert('Save failed.');
    }
    this.studentForm.reset();
    document.querySelector('#studentManagement #passwordField').style.display = '';
  }

}
