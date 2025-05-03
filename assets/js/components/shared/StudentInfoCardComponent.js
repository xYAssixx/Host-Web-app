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
			 <div class="card">
			 <div class="personal-card">
                    <div class="avatar">
                        <img draggable="false" src="${window.location.origin + student.photo || ''}" alt="">
                        <h2>${student.firstName}</h2>
                        <span>Level 20</span>
                        <div class="progress"></div>
                        <div class="rating">
                            <i class="fa-solid fa-star c-orange fs-13"></i>
                            <i class="fa-solid fa-star c-orange fs-13"></i>
                            <i class="fa-solid fa-star c-orange fs-13"></i>
                            <i class="fa-solid fa-star c-orange fs-13"></i>
                            <i class="fa-solid fa-star c-orange fs-13"></i>
                        </div>
                        <div class="rating-counter">550 Rating</div>
                    </div>
                    <div class="info">
                        <div class="box">
                            <h3>General info 
                                <input type="checkbox" checked name="display" id="display1">
                                <label for="display1">
                                    <div class="button"> </div>
                                </label>
                            </h3>
                            <div><span>full name:</span>${student.firstName} ${student.lastName}</div>
                            <div><span>Class:</span>${student.class}</div>
														<div><span>gender:</span>${student.gender}</div>
                        </div>
                        <div class="box">
                            <h3>Personal Information
                                <input type="checkbox" name="display" id="display2">
                                <label for="display2">
                                    <div class="button"> </div>
                                </label>
                            </h3>
                            <div><span>age:</span>${student.age}</div>
                            <div><span>Parent ID:</span> ${student.parentId}</div>
                            <div><span>Date Of Birth:</span>19/05/2003</div>
                        </div>
                        
                        <div class="box">
                            <h3>Billing Information
                                <input type="checkbox" name="display" id="display4">
                                <label for="display4">
                                    <div class="button"> </div>
                                </label>
                            </h3>
                            <div><span>Payment Method:</span>CCP</div>
                            <div><span>Email:</span>email@website.com</div>
                            <div><span>Subscription:</span>Monthly</div>
                        </div>
                    </div>
                </div>
                </div>
    `;
  }

  return { init };
})();
