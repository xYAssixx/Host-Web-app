// /assets/js/components/classManagementComponent.js
import { apiService } from '../../services/ApiService.js';
import { formValidation } from '../../services/Utils.js';
import StudentManagement from './StudentManagementComponent.js';
export default class ClassManagement {
  constructor(studentMngInstance) {
		this.studentMng = studentMngInstance;
    this.pageSize    = 10;
    this.currentPage = 1;
    // DOM elements
		this.tableBody   = document.querySelector('#classManagement #ClassTableBody');
    this.searchInput = document.querySelector('#classManagement #clsSearchInput');
    this.searchFilter  = document.querySelector('#classManagement #searchClsFilter');
    this.pagination  = document.querySelector('#classManagement #pagination');
    this.classForm    = document.querySelector('#classManagement #classForm');
    this.deleteBtn   = document.querySelector('#classManagement #deleteClassBtn');
    this.classModalEl = document.querySelector('#classManagement #classModal');
    this.delModalEl  = document.querySelector('#classManagement #confirmDeleteModal');
    this.classIdToDelete = null;
  }

  init() {
    // Wire up search & filter
    this.searchInput.addEventListener('input',  () => this.loadPage(1,true));
    this.searchFilter.addEventListener('change', () => this.loadPage(1,true));

    // Delegate edit/delete button clicks
    this.tableBody.addEventListener('click', e => {
      if (e.target.closest('.edit-btn')) {
        this.openEditModal(e.target.closest('.edit-btn').dataset.classId);
      }
      if (e.target.closest('.delete-btn')) {
        this.openDeleteModal(e.target.closest('.delete-btn').dataset.classId);
      }
			if (e.target.closest('.redirect-btn')) {
        this.redirectToStudents(e.target.closest('.redirect-btn').dataset.className);
      }
			
    });

    // Hook modals & form
    this.deleteBtn.addEventListener('click', () => this.confirmDelete());
    this.classForm .addEventListener('submit', e => {
			if(formValidation(classForm,e)){
				return;
			}
			this.handleFormSubmit(e)});

    // First load
    this.loadPage(1,true);
  }
  async fetchClassesPage(page = 1,useCache=true) {
    const all = await apiService.fetchClasses({},useCache);
    // Apply search + role filter
		const filter = this.searchFilter.value;
		let term = this.searchInput.value.toLowerCase();
		let filtered;
		switch(filter){
			case ("Id"):
				filtered = all.filter(c =>
					(c.id==term || !term)
				);
				break;
			case("Name"):
			filtered = all.filter(c =>(!term || c.name.toLowerCase().startsWith(term)));
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
      const { data, meta } = await this.fetchClassesPage(page,useCache);
      this.renderTable(data);
      this.renderPagination(meta.page, meta.totalPages);
    } catch (err) {
      console.error(err);
      alert('Failed to load classes.');
    }
  }

  renderTable(classes) {
    this.tableBody.innerHTML = '';
    if (classes.length === 0) {
      this.tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No classes found.</td></tr>`;
      return;
    }
    classes.forEach(c => {
      const tr = document.createElement('tr');
			tr.setAttribute("data-class-id",c.id) ;
      tr.innerHTML = `
				<th scope="row">${c.id}</th>
        <td>${c.name}</td>
        <td  class="text-center ">
          <button class="btn btn-sm btn-outline-secondary edit-btn"
                  data-class-id="${c.id}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger delete-btn"
                  data-class-id="${c.id}">
            <i class="bi bi-trash"></i>
          </button>
					<button class="btn btn-sm btn-outline-primary redirect-btn"
                  data-class-Name="${c.name}">
            Students
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
      const [cls] = await apiService.fetchClassById(id);
			console.log(cls)
      document.querySelector('#classManagement #classId').value    = cls.id;
      document.querySelector('#classManagement #className').value  = cls.name;
      document.querySelector('#classManagement #classModalLabel').textContent = 'Edit class';
      new bootstrap.Modal(this.classModalEl).show();
    } catch (err) {
      console.error(err);
      alert('Cannot load class for editing.');
    }
  }

  openDeleteModal(id) {
    this.classIdToDelete = id;
    new bootstrap.Modal(this.delModalEl).show();
  }

  async confirmDelete() {
    if (!this.classIdToDelete) return;
    try {
      await apiService.deleteclass(this.classIdToDelete);
      new bootstrap.Modal(this.delModalEl).hide();
      this.loadPage(this.currentPage,false);
    } catch {
      alert('Delete failed.');
    }
    this.classIdToDelete = null;
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const id  = document.querySelector('#classManagement #classId').value;
    const dto = {
			Name:document.querySelector('#classManagement #className').value ,
    };
    try {
      if (id) {
        await apiService.updateClass(id, dto);
      } else {
        await apiService.createClass(dto);
      }
      new bootstrap.Modal(this.classModalEl).hide();
      this.loadPage(this.currentPage,false);
    } catch {
      alert('Save failed.');
    }
    this.classForm.reset();
    document.querySelector('#classManagement #passwordField').style.display = '';
  }
	redirectToStudents(name) {
    document.getElementById("stuMng-tab").click();
      const searchFilter = document.querySelector('#studentManagement #searchStuFilter');
      const searchInput  = document.querySelector('#studentManagement #StuSearchInput');
      searchFilter.value = 'Class';
      searchInput.value = name;
      this.studentMng.loadPage(1, true);
    
  }
}