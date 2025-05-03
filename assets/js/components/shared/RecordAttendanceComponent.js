import { apiService } from "../../services/ApiService.js";
import { formValidation } from "../../services/Utils.js";
export default class RecordAttendance {
  constructor() {
    this.recordAttendanceForm = document.querySelector(
      "#recordAttendance #recordAttendanceForm"
    );
    this.selectClass = document.querySelector("#recordAttendance #attClass");
    this.studentList = document.querySelector("#recordAttendance #stuList");
    this.tableBody = document.querySelector(
      "#recordAttendance #attendanceTableBody"
    );
    this.studentNumber = 0;
    this.dto = new Map();
  }
  init() {
    this.studentList.style.display = "none";
    this.recordAttendanceForm.addEventListener("submit", (e) => {
      if (formValidation(this.recordAttendanceForm, e)) {
        return;
      }
      this.handleFetchStudentList(e);
    });
    this.fetchClassList();
    this.studentList.addEventListener("submit", (e) => {
      if (formValidation(this.studentList, e)) {
        return;
      }
      this.handleAttendanceSubmit(e);
    });
  }

  async fetchClassList() {
    const classes = await apiService.fetchClasses({}, true);
    classes.forEach((c) => {
      const opt = document.createElement("option");
      opt.setAttribute("value", c.name);
      opt.innerHTML = `${c.name}`;
      this.selectClass.appendChild(opt);
    });
  }

  async handleFetchStudentList(e) {
    e.preventDefault();
    this.dto.set("cls", document.querySelector("#attClass").value);
    this.dto.set("lecture", document.querySelector("#lecture").value);
    const stuList = await apiService.fetchStudentByClass(
      this.dto.get("cls"),
      true
    );
    this.dto.set("studentList", stuList);
    console.log(this.dto);
    this.renderTable(this.dto);
  }
  renderTable(dto) {
    const stuList = dto.get("studentList");
    stuList.forEach((s) => {
      this.studentNumber++;
      const tr = document.createElement("tr");
      tr.innerHTML = `
		<th scope="row">${s.id}</th>
        <td>${s.firstName} ${s.lastName}</td>
        <td>${s.parentId}</td>
        <td class="text-center">${s.class}</td>
        <td class="text-center">
          <span class="badge ${
            s.paymentStatus === "Paid"
              ? "bg-success"
              : s.paymentStatus === "Pending"
              ? "bg-info"
              : "bg-danger"
          }">
            ${s.paymentStatus}
          </span>
        </td>
        <td  class="text-center ">
          
					<div data-student-id="${s.id}" class ="d-flex form-check gap-1">
						<input type="radio" class="form-check-input btn-check" checked name="options${
              s.id
            }" id="present${s.id}" autocomplete="off" checked>
						<label class="form-check-label btn btn-sm btn-outline-success" for="present${
              s.id
            }"><i class="bi bi-check2"></i></label>
						<input type="radio" class="form-check-input btn-check btn-outline-warning" name="options${
              s.id
            }" id="late${s.id}" autocomplete="off" >
						<label class="form-check-label btn btn-sm btn-outline-warning" for="late${
              s.id
            }"><i class="bi bi-check2"></i></label>
						<input type="radio" class="form-check-input btn-check" name="options${
              s.id
            }" id="absent${s.id}" autocomplete="off" >
						<label class="form-check-label btn btn-sm btn-outline-danger" for="absent${
              s.id
            }"><i class="bi bi-check2"></i></label>
					</div>
        </td>
		`;
      this.tableBody.appendChild(tr);
    });
    this.recordAttendanceForm.remove();
    this.studentList.style.display = "block";
  }
  async handleAttendanceSubmit(e) {
    e.preventDefault();
    const cls = this.dto.get("cls");
    const lecture = this.dto.get("lecture");
    const students = this.dto.get("studentList");
    const date = new Date().toISOString();
    const Attendance = [];

    students.forEach((student) => {
      const selected = document.querySelector(
        `input[name="options${student.id}"]:checked`
      );
      const status = selected ? selected.id.replace(/[0-9]/g, "") : "absent"; // Extract "present", "late", or "absent" and just remove student id

      Attendance.push({
        cls,
        lecture,
        date,
        studentId: student.id,
        status: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize
      });
    });

    // console.log(Attendance);
    return apiService.submitAttendance(Attendance);
  }
}
