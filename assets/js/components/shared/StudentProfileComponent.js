// StudentProfileTabComponent.js

import { StudentInfoCardComponent } from './StudentInfoCardComponent.js';
import { AttendanceTableComponent } from './AttendanceTableComponent.js';
import { BehaviorReportComponent } from './BehaviorReportComponent.js';
import { AssignedBillsComponent } from './AssignedBillsComponent.js';

export default class StudentProfile  {
	constructor(){

	}
  init(studentId, userRole) {
    if (!studentId || !userRole) {
      console.error("StudentProfileTabComponent: studentId and userRole are required.");
      return;
    }

    StudentInfoCardComponent.init(studentId);
    // AttendanceTableComponent.init(studentId);
    // BehaviorReportComponent.init(studentId);
    
    if (userRole === 'admin' || userRole === 'parent') {
      // AssignedBillsComponent.init(studentId, userRole);
    }
  }

};
