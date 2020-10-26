$(document).ready(function () {
    //load dữ liệu
    employeeJS = new EmployeeJS("/api/employees");
})
/**
 * class quản lí các function cho trang employee
 * */
class EmployeeJS extends BaseJS {
    constructor(url) {
        super();
        //this.loadData();
    }
    btnDuplicateOnClick() {
        super.btnDuplicateOnClick();
        this.FormMode ='Add';
    }
    /**
    * Load dữ liệu
    * Author: LTPThao (25/09/2020)
    * */
    loadData() {
        var self = this;
        commonJS.showLoading();
        //Lấy dữ liệu trên server thông qua lời gọi tới api sevice:
        $.ajax({
            url: "/api/employees",
            method: "GET",
            data: "", //Tham so se truyen qua body request
            contentType: "application/json",
            dataType: "json"
        }).done(function (response) {

            //Lấy dữ liệu: tên tuổi convention với mảng đặt tên đối tượng có chữ 's', 'es' ở cuối, sd tiếng anh

            $('.grid-content tbody').empty();
            //đọc thông tin các cột dữ liệu
            var fields = $('table#tbListData thead th');
            var keyId = $('table#tbListData').attr('keyid');
            //Lấy dữ liệu
            var data = this.Data;
            $.each(response, function (index, obj) {

                var tr = $(`<tr></tr>`);
                $.each(fields, function (index, field) {
                    /*debugger;*/
                    var fieldName = $(field).attr('fieldName');
                    fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
                    var value = obj[fieldName];

                    if (fieldName == 'salary' && value != null) {

                        var td = $(`<td title="` + value + `" style="text-align: right; padding-right: 6px;">` + commonJS.formatMoney(value) + `</td>`);
                    } else if (fieldName == "dateOfBirth" && value != null) {
                        var td = $(`<td title="` + value + `"style="text-align: center;">` + commonJS.formatDate(value) + `</td>`);
                    } else if (fieldName == 'employeeId') {
                        var td = $(`<td style="display:none" title="` + value + `">` + value + `</td>`);
                    } else {
                        var td = $(`<td title="` + value + `">` + (value != null ? value : "") + `</td>`);
                    }
                    $(tr).data('keyid', obj[keyId]);
                    $(tr).data('data', obj);
                    $(tr).append(td);
                })
                //Binding dữ liệu lên UI:
                //var trHTML = self.makeTrHTML(obj);
                $('#tbListData tbody').append(tr);
            })
            commonJS.hideLoading();
        }).fail(function (response) {
            commonJS.hideLoading();
        })
    }

    /**
    * Lấy Id mới nhất của nhân viên
    * Created by: LTPThao (21/10/2020)
    * */
    getLastedEmployeeCode() {
        this.lastedCode = 0;
        commonJS.showLoading();
        try {
            var self = this;

            $.ajax({
                url: "/api/employees/new-employee-code",
                method: "GET",
                contentType: "application/json",
                async: false,
            }).done(function (employeeCode) {
                if (employeeCode != null) {
                    $('#txtEmployeeCode').val(employeeCode);
                }
                commonJS.hideLoading();
            })
            return self.lastedCode;
        } catch (e) {
            commonJS.hideLoading();
        }
    }

    btnAddOnClick() {
        var self = this;
        self.FormMode = 'Add';
        self.onShowDialog();
        self.getLastedEmployeeCode();
    }


    btnSaveAndAdd() {
        var res = this.saveData();
        debugger;
        if (res) {
            var self = this;
            self.FormMode = 'Add';
            self.onShowDialog();
            self.getLastedEmployeeCode();
        }
        this.loadData();
    }


    /**
    * Sự kiện sửa thông tin nhân viên
    * Created by: LTPThao (21/20/2020)
    */
    btnEditOnClick() {
        var self = this;
        self.onShowDialog();
        this.FormMode = 'Edit';
        // Lấy thông tin bản ghi đã chọn trong danh sách:
        var recordSelected = $('#tbListData tbody tr.row-selected');
        if (recordSelected.length > 0) {
            try {
                this.FormMode = 'Edit';

                //var recordSelected = $('#tbListData tbody tr.row-selected');
                var id = this.getRecordIdSelected();
                $.ajax({
                    url: "/api/employees/" + id,
                    method: "GET",
                    data: "",
                    dataType: "json",
                    contentType: "application/json",
                    async: false
                }).done(function (employee) {
                    var objectDetail = employee;
                    var inputs = $("input[fieldName], select[fieldName]");
                    $.each(inputs, function (index, input) {
                        var fieldName = $(input).attr('fieldName');
                        if (fieldName == "dateOfBirth" || fieldName == 'identityDate' || fieldName == 'joinDate' || fieldName == 'identityNumber') {
                            $(input).val(commonJS.formatDateISO(objectDetail[fieldName]));
                        }
                        else {
                            $(input).val(objectDetail[fieldName]);
                        }
                    })
                }).fail(function (response) {

                })


            } catch (e) {

            }
        }
        else {
            this.onHideDialog();
            this.onShowDialogReminder();
        }
    }

    saveData() {
        debugger
        var self = this;
        var isValid = true;
        //validate dữ liệu
        // - Check bắt buộc nhập
        var inputRequireds = $('input[required]');
        $.each(inputRequireds, function (index, input) {
            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass("require-error")) {
                isValid = false;
            }
        })
        if (isValid) {
            isValid = self.validateCustom();
        }
        if (isValid) {
            //Build object cần lưu
            var inputs = $('input[fieldName], select[fieldName]');
            var employee = {};
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr('fieldName');
                var value = $(input).val();
                employee[fieldName] = value;
                if (fieldName == "salary" || fieldName == "gender" || fieldName == "workStatus") {
                    if (parseFloat(value) == NaN) {
                        employee[fieldName] = null;
                    }
                    else {
                        employee[fieldName] = parseFloat(value);
                    }
                }

                if (fieldName == 'dateOfBirth' || fieldName == 'identityDate' || fieldName == 'joinDate' || fieldName == 'identityNumber') {
                    if (value == "") {
                        employee[fieldName] = null;
                    }
                }

                if (fieldName == "email") {
                    if (!employee[fieldName] == validData.validateEmail(value))
                        return false;
                    else
                        return true;
                }

            })


            //Gọi service thực hiện lưu dữ liệu
            //Check nut cat, neu == add thi them du lieu con == edit thi sua du lieu
            if (self.FormMode == 'Add') {
                //Lấy dữ liệu trên server thông qua lời gọi tới api sevice:
                $.ajax({
                    url: "/api/employees",
                    method: "POST",
                    data: JSON.stringify(employee), //Tham so se truyen qua body request
                    contentType: "application/json",
                    dataType: "json"
                }).done(function (response) {
                    self.onHideDialog();
                    
                }).fail(function (response) {
                    return false;
                })
                self.onHideDialog();
                self.loadData();
            } else {
                var id = self.getRecordIdSelected();
                //Lấy dữ liệu trên server thông qua lời gọi tới api sevice:
                $.ajax({
                    url: "/api/employees/" + id,
                    method: "PUT",
                    async:false,
                    data: JSON.stringify(employee),
                    contentType: "application/json"
                }).done(function (response) {
                    return true;
                }).fail(function (response) {
                    return false;
                })
                self.onHideDialog();
                self.loadData();
            }
            //Xử lý sau khi lưu dữ liệu
            self.onHideDialog();
            self.loadData();

        }

    }
}
