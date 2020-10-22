$(document).ready(function () {
    //load dữ liệu
    var employeeJS = new EmployeeJS("/api/employees");
})
/**
 * class quản lí các function cho trang employee
 * */
class EmployeeJS extends BaseJS {
    constructor(url) {
        super(url);
    }

}
