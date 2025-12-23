import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { employeeModal } from './model/employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: employeeModal = new employeeModal();
  employeeList: employeeModal[] = [];
  constructor() {
    this.createForm()
     const oldData = localStorage.getItem("empData");
      if(oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeList = parseData;
      }
  }


  createForm () {
    this.employeeForm = new FormGroup ({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      emailId: new FormControl(this.employeeObj.emailId),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      contactNo: new FormControl(this.employeeObj.contactNo),
      address: new FormControl(this.employeeObj.address),
    })
  }

  onSave() {
    const oldData = localStorage.getItem("empData");
    if(oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
       this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("empData", JSON.stringify(this.employeeList))
  }
   onEdit(item: employeeModal) {
    this.employeeObj = item;
    this.createForm()
  }
}
