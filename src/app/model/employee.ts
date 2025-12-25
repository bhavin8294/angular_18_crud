export class EmployeeModel {
    empId: number;
    name: string;
    emailId: string;
    city: string;
    state: string;
    contactNo: string;
    address: string;

    constructor() {
        this.city = '';
        this.contactNo = '';
        this.address = '';
        this.emailId = '';
        this.empId = 1;
        this.state = '';
        this.name = '';
    }
}