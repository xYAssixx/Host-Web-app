// components/AssignedBillsComponent.js
import { apiService } from '../../services/ApiService.js';


export const BehaviorReportComponent = (() => {
  let reports = [];
  let currentEditId = null;
  let studentId = null;

  function init(_studentId) {
    studentId = _studentId;
    loadReports();
    bindGlobalEvents();
  }

  async function loadReports() {
    try {
      reports = await apiService.get(`/students/${studentId}/behavior-reports`);
      renderTable();
    } catch (error) {
      console.error('Error loading behavior reports:', error);
    }
  }

  function renderTable() {
    const container = document.getElementById('behavior-report-section');
    if (!container) return;

    container.innerHTML = `
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Behavior Reports</h5>
          <button class="btn btn-sm btn-primary" id="add-report-btn">
            <i class="bi bi-plus-circle"></i> Add Report
          </button>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${reports.map(report => `
                <tr data-id="${report.id}">
                  <td>${report.date}</td>
                  <td>${report.category}</td>
                  <td>${report.description}</td>
                  <td>${report.teacher || 'N/A'}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary edit-btn"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-sm btn-outline-danger delete-btn"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      ${renderModal()}
    `;

    bindTableEvents();
  }

  function renderModal() {
    return `
      <div class="modal fade" id="reportModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <form id="report-form">
              <div class="modal-header">
                <h5 class="modal-title">${currentEditId ? 'Edit' : 'Add'} Behavior Report</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <input type="date" class="form-control mb-2" name="date" required />
                <select class="form-select mb-2" name="category" required>
                  <option value="">Select Category</option>
                  <option value="Participation">Participation</option>
                  <option value="Disruption">Disruption</option>
                  <option value="Respect">Respect</option>
                </select>
                <textarea class="form-control mb-2" name="description" placeholder="Description" required></textarea>
                <input type="text" class="form-control mb-2" name="teacher" placeholder="Teacher (optional)" />
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-success">${currentEditId ? 'Update' : 'Add'}</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  function bindTableEvents() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const row = e.target.closest('tr');
        const id = row.dataset.id;
        currentEditId = id;
        openModalWithData(reports.find(r => r.id == id));
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async e => {
        const row = e.target.closest('tr');
        const id = row.dataset.id;
        if (confirm('Are you sure you want to delete this report?')) {
          await apiService.delete(`/behavior-reports/${id}`);
          loadReports();
        }
      });
    });
  }

  function bindGlobalEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'add-report-btn') {
        currentEditId = null;
        openModalWithData(null);
      }
    });

    document.addEventListener('submit', async (e) => {
      if (e.target.id === 'report-form') {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.studentId = studentId;

        if (currentEditId) {
          await apiService.put(`/behavior-reports/${currentEditId}`, data);
        } else {
          await apiService.post(`/behavior-reports`, data);
        }

        bootstrap.Modal.getInstance(document.getElementById('reportModal')).hide();
        loadReports();
      }
    });
  }

  function openModalWithData(data) {
    const modalEl = document.getElementById('reportModal');
    const modal = new bootstrap.Modal(modalEl);
    const form = modalEl.querySelector('#report-form');

    if (data) {
      form.date.value = data.date;
      form.category.value = data.category;
      form.description.value = data.description;
      form.teacher.value = data.teacher || '';
    } else {
      form.reset();
    }

    modal.show();
  }

  return { init };
})();