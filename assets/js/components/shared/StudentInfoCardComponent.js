// components/StudentInfoCardComponent.js

import { apiService } from '../../services/ApiService.js';

export const StudentInfoCardComponent = (() => {
  let student = null;

  async function init(studentId) {
    try {
      [student] = await apiService.fetchStudentById(studentId);
      render();
    } catch (err) {
      console.error('Failed to load student info:', err);
    }
  }

  function render() {
    const container = document.getElementById('student-info-section');
    if (!container || !student) return;
		console.log(student)
    container.innerHTML = `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 text-center">
              <img src="${window.location.origin + student.photo || ''}" alt="photo" class="img-fluid rounded-circle mb-2" width="100" />
              <h5>${student.firstName} ${student.lastName}</h5>
              <small>ID: ${student.id}</small>
            </div>
            <div class="col-md-9">
              <div class="row">
                <div class="col-6 mb-2"><strong>Age:</strong> ${student.age}</div>
                <div class="col-6 mb-2"><strong>Class:</strong> ${student.class}</div>
                <div class="col-6 mb-2"><strong>Status:</strong> ${student.status || 'Active'}</div>
                <div class="col-6 mb-2"><strong>ParentId:</strong> ${student.parentId}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

			
    `;
  }

  return { init };
})();
