// assets/js/components/shared/AssignedBillsComponent.js
import { apiService } from '../../services/ApiService.js';

export const AssignedBillsComponent = (() => {
  let bills = [];
  async function init(studentId, role) {
    if (!['admin','parent'].includes(role)) return;
    bills = await apiService.fetchBill(studentId);
    render();
  }
  function render() {
    document.getElementById('bills-section').innerHTML = `
      <div class="card my-3 shadow-sm">
        <div class="card-header">Assigned Bills</div>
        <div class="card-body table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th><th>Amt</th><th>Due</th><th>Status</th><th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${bills.map(b=>`
                <tr>
                  <td>${b.title}</td>
                  <td>$${b.amount}</td>
                  <td>${b.dueDate}</td>
                  <td class="${b.status==='Unpaid'?'text-danger':'text-success'}">${b.status}</td>
                  <td>${b.notes||'–'}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  }
  return { init };
})();
