// assets/js/components/shared/AttendanceTableComponent.js
import { apiService } from '../../services/ApiService.js';

export const AttendanceTableComponent = (() => {
  let records = [];
  async function init(studentId) {
    records = await apiService.get(`/students/${studentId}/attendance`);
    render();
  }
  function render() {
    document.getElementById('attendance-section').innerHTML = `
      <div class="card mb-4 shadow-sm">
        <div class="card-header">Attendance</div>
        <div class="card-body table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Date</th><th>Status</th><th>In</th><th>Out</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(r=>`
                <tr>
                  <td>${r.date}</td>
                  <td class="${r.status==='Absent'?'text-danger':'text-success'}">${r.status}</td>
                  <td>${r.timeIn||'-'}</td>
                  <td>${r.timeOut||'-'}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  }
  return { init };
})();
