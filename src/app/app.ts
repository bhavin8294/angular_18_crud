import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  employeeForm!: FormGroup;
  employeeList: EmployeeModel[] = [];
  isEditMode = false;

  constructor() {
    this.createForm();

    const oldData = localStorage.getItem('empData');
    if (oldData) {
      this.employeeList = JSON.parse(oldData);
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(0),
      name: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      contactNo: new FormControl('', Validators.required),
      city: new FormControl(''),
      state: new FormControl(''),
      address: new FormControl('')
    });
  }

  // ✅ SAVE
  onSave() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const newEmp = this.employeeForm.value;
    newEmp.empId = this.employeeList.length
      ? Math.max(...this.employeeList.map(e => e.empId)) + 1
      : 1;

    this.employeeList.unshift(newEmp);
    localStorage.setItem('empData', JSON.stringify(this.employeeList));

    this.employeeForm.reset();
  }

  // ✅ EDIT
  onEdit(item: EmployeeModel) {
    this.isEditMode = true;
    this.employeeForm.patchValue(item);
  }

  // ✅ UPDATE
  onUpdate() {
    if (this.employeeForm.invalid) return;

    const index = this.employeeList.findIndex(
      e => e.empId === this.employeeForm.value.empId
    );

    if (index > -1) {
      this.employeeList[index] = this.employeeForm.value;
      localStorage.setItem('empData', JSON.stringify(this.employeeList));
    }

    this.employeeForm.reset();
    this.isEditMode = false;
  }

  // ✅ DELETE
  onDelete(id: number) {
    if (confirm('Are you sure want to Delete?')) {
      this.employeeList = this.employeeList.filter(e => e.empId !== id);
      localStorage.setItem('empData', JSON.stringify(this.employeeList));
    }
  }

  // ✅ RESET BUTTON
  onReset() {
    this.employeeForm.reset();
    this.isEditMode = false;
  }
  
  // ✅ VALIDATION TEXT
  isInvalid(controlName: string) {
    const control = this.employeeForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
