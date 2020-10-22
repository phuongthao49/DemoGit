$(document).ready(function () {
})
/**
 * Class quản lý các function cho trang Employee
 * Author: LTPThao (26/09/2020)
 * */
class BaseJS {
    constructor(url) {
        try {
            this.geturl = url;
            this.getData();
            this.loadData();
            this.initEvents();
            this.getDataPosition();
            this.loadDataPosition();
            this.getDataDepartment();
            this.loadDataDepartment();
            this.getLastedEmployeeCode();
            this.getRecordIdSelected();
        } catch (e) {
            console.log(e);
        }
    }

    getData() {
        this.Data = [];
    }

    //#region "initEvents"
    /**
    * Gán sự kiện cho các thành phần
    * Author: LTPThao (25/09/2020)
    * */
    initEvents() {
        var self = this;
        //gắn sự kiện
        $('#btnAdd').click(function () {
            self.FormMode = 'Add';
            self.onShowDialog();
            self.getLastedEmployeeCode();
        })
        $('#btnCancelDialog').click(this.onHideDialog.bind(this));
        $('#btnClose').click(this.onHideDialog.bind(this));
        $('.dlgConfirm-header #btnClose').click(this.onHideDialog.bind(this));
        $('#btnCancelEmployee').click(this.onHideDialog.bind(this));
        $('#btnAddEmployee').click(this.btnSaveOnClick.bind(this));
        $('#btnLoadData').click(this.btnReLoadOnClick.bind(this));
        $('table#tbListData').on('click', 'tr', this.rowOnClick);
        $('#btnDelete').click(this.btnDeleteOnClick.bind(this));
        $('#btnOk').click(this.btnOkOnClick.bind(this));
        $('#btnEdit').click(this.btnEditOnClick.bind(this));
        $('#btnDuplicate').click(this.btnDuplicateOnClick.bind(this));
    }
    //#endregion "initEvents"

    
     //#region "loadData"
    /**
    * Load dữ liệu
    * Author: LTPThao (25/09/2020)
    * */
    loadData() {
        var self = this;
        self.getLastedEmployeeCode();
        //Lấy dữ liệu trên server thông qua lời gọi tới api sevice:
        $.ajax({
            url: "/api/employees",
            method: "GET",
            data: "", //Tham so se truyen qua body request
            contentType: "application/json",
            dataType: "json"
        }).done(function (response) {

            //Lấy dữ liệu: tên tuổi convention với mảng đặt tên đối tượng có chữ 's', 'es' ở cuối, sd tiếng anh
            try {
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

                        if ((fieldName == 'salary' && value != null) || value == null) {
                            
                            var td = $(`<td title="` + value + `" style="text-align: right;">` + commonJS.formatMoney(value) + `</td>`);
                        } else if ((fieldName == "dateOfBirth" && value != null) || value == null) {
                            var td = $(`<td title="` + value + `"style="text-align: center;">` + commonJS.formatDate(value) + `</td>`);
                        } else if (fieldName == 'employeeId') {
                            var td = $(`<td style="display:none" title="` + value + `">` + value + `</td>`);
                        } else{
                            var td = $(`<td title="` + value + `">` + value + `</td>`);
                        }
                        $(tr).data('keyid', obj[keyId]);
                        $(tr).data('data', obj);
                        $(tr).append(td);
                    })
                    //Binding dữ liệu lên UI:
                    //var trHTML = self.makeTrHTML(obj);
                    $('#tbListData tbody').append(tr);
                })
            } catch (e) {

            }
        }).fail(function (response) {
        })
    }
    //#endregion "loadData"

     //#region "btnSaveOnClick - Save data"
/**-----------------------------------------------------------------------
     * Thực hiện lưu dữ liệu
     * Author: LTPThao (01/10/2020)
     * */
btnSaveOnClick() {
    var self = this;
    var isValid = true;
    //validate dữ liệu
    // - Check bắt buộc nhập
    var inputRequireds = $('input[required]');
    $.each(inputRequireds, function (index, input) {
        if (!validData.validateRequired(input)) {
            isValid = false;
        }
        $(input).trigger('blur');
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
                employee[fieldName] = parseFloat(value);
            }

        })


        //Gọi service thực hiện lưu dữ liệu
        //Check nut cat, neu == add thi them du lieu con == edit thi sua du lieu
        if (self.FormMode == 'Add') {
            alert('add');
            //Lấy dữ liệu trên server thông qua lời gọi tới api sevice:
            $.ajax({
                url: "/api/employees",
                method: "POST",
                data: JSON.stringify(employee), //Tham so se truyen qua body request
                contentType: "application/json",
                dataType: "json"
            }).done(function (response) {
                self.onHideDialog();
                self.loadData();
            }).fail(function (response) {

            })
        } else {

            alert('edit');
            var id = self.getRecordIdSelected();
            //Lấy dữ liệu trên server thông qua lời gọi tới api sevice:
            $.ajax({
                url: "/api/employees/" + id,
                method: "PUT",
                data: JSON.stringify(employee),
                contentType: "application/json"
            }).done(function (response) {
                self.loadData();
            }).fail(function (response) {

            })
        }
        //Xử lý sau khi lưu dữ liệu
        self.onHideDialog();
        self.loadData();

    }

}
validateCustom() {
    return true;
}
//#endregion "btnSaveOnClick - Save data"

     //#region "ReloadData"
    /**
     * Hàm load lại dữ liệu
     * Author: LTPThao (25/05/2020)
     * */
    btnReLoadOnClick() {
        this.loadData();
}
//#endregion "ReloadData"

     //#region "ShowDialog, HideDialog"
    /**---------------------------------------------------------------------
     * Hiển thị Dialog: Thêm một 1 employee
     * Author: LTPThao(25/5/2020)
     * */
    onShowDialog() {
        $('#model').show();
        $('#dlgDetail').show();
        $('.table-content input').val(null);
        $('.work-Info-Detail input').val(null);
        $('.identityPlace input').val(null);
        /*$('employeeCode').val(this.AutoUpperCode);*/
        $('#txtEmployeeCode').focus();
    }
    /**---------------------------------------------------------------------
     * Hiển thị Dialog: Thêm một 1 employee
     * Author: LTPThao(25/5/2020)
     * */
    onShowDialogConfirm() {
        $('#model').show();
        $('#dlgConfirm').show();
    }

    /**---------------------------------------------------------------------
     * Ẩn Dialog
     * Author: LTPThao (25/05/2020)
     * */
    onHideDialog() {
        $('#model').hide();
        $('#dlgDetail').hide();
        $('#dlgConfirm').hide();
}
//#endregion "ShowDialog, HideDialog"

    
    

    //#region "rowOnClick"
    /**
    * hàm để khi click vào 1 row, row được chọn đó sẽ đổi màu
    * Author: LTPThao(25/09/2020)
    * */
    rowOnClick() {
        $(this).addClass('row-selected');
        $(this).siblings().removeClass('row-selected');
    }

    //#endregion "rowOnClick"

    //#region "get-load: DataPosition"
    /**
     * Lấy dữ liệu Position
     * Author: Lê Mạnh (20/10/2020)
     * */
    getDataPosition() {
        this.DataPosition = {};
        try {
            var self = this;
            $.ajax({
                url: "/api/positions",
                method: "GET",
                data: "",
                contentType: "application/json",
                dataType: "",
                async: false,
            }).done(function (position) {
                self.DataPosition = position;
            })
        } catch (e) {
        }
    }
    loadDataPosition() {
        try {
            var self = this;
            $.each(this.DataPosition, function (index, obj) {
                $('.dialogEmployee-background .work-Info .work-Info-Detail .work-Info-Row .position-title select').append('<option value="' + obj["possitionId"] + '">' + obj["possitionName"] + '</option>');
            })
        } catch (e) {
        }
}

    //#endregion "get-load: DataPosition"

    //#region "get-load: DataDepartment"
    getDataDepartment() {
        this.DataDepartment = {};
        try {
            var self = this;
            $.ajax({
                url: "/api/departments",
                method: "GET",
                data: "",
                contentType: "application/json",
                dataType: "",
                async: false,
            }).done(function (department) {
                self.DataDepartment = department;
            }).fail(function (response) {

            })
        } catch (e) {
        }
    }
    loadDataDepartment() {
        try {
            var self = this;
            $.each(this.DataDepartment, function (index, obj) {
                $('.dialogEmployee-background .work-Info .work-Info-Detail .work-Info-Row .department-title select').append('<option value="' + obj["departmentId"] + '">' + obj["departmentName"] + '</option>');
            })
        } catch (e) {
        }
}
    //#endregion "get-load: DataDepartment"
        

    getRecordIdSelected() {

        // Lấy thông tin bản ghi đã chọn trong danh sách:
        var recordSelected = $('#tbListData tbody tr.row-selected');
        // Lấy dữ liệu chi tiết của bản ghi đã chọn:
        var id = recordSelected.data("data")["employeeId"];
        return id;
    }

    //#region "DeleteEmployee"
    /**
     * Sự kiện khi click vào button Xóa
     * Created by: LTPThao (21/10/2020)
     * */
    btnDeleteOnClick() {
        var self = this;
        // Lấy id của bản ghi được chọn:
        var id = this.getRecordIdSelected();
        $('#dlgConfirm-title').text("Bạn có chắc muốn xóa nhân viên " + $('.row-selected td:nth-child(2)').text() + " không?");

        if (!id) {
            var noti = "Employee không tồn tại!!!";
            this.onShowDialogConfirm(noti);
        } else {
            this.onShowDialogConfirm();
        }
}
    /**
     * Sự kiện khi click vào button OK của dialog xác nhận xóa 1 nhân viên
     * Created by: LTPThao (21/10/2020)
     * */
    btnOkOnClick() {
        ;
        var self = this;
        // Lấy id của bản ghi được chọn:
        var id = this.getRecordIdSelected();
        // Thực hiện xóa nếu xác nhận là ok:
        $.ajax({
            url: "/api/employees/" + id,
            method: "DELETE"

        }).done(function (response) {
            ;
            if (response) {
                self.onHideDialog();
            } else {
                var noti = "Employee không tồn tại!!!";
                this.onShowDialogConfirm();
            }
            self.loadData();
        }).fail(function () {
            var noti = "Vui lòng kiểm tra lại!";
        })

}

//#endregion "DeleteEmployee"

    //#region "UpdateEmployee"
    /**
     * Sự kiện sửa thông tin nhân viên
     * Created by: LTPThao (21/20/2020)
     */
    btnEditOnClick() {
        var self = this;
        self.onShowDialog();
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
                    else if (fieldName == "phoneNumber") {
                        $(input).val(commonJS.formatPhone(objectDetail[fieldName]));
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
    //#endregion "UpdateEmployee"

    //#region "DuplicateEmployee"
    /**
     * Sự kiện nhân bản nhân viên
     * Created by: LTPThao (21/10/2020)
     * */
btnDuplicateOnClick() {
    var self = this
    var id = 0;
    // Hiển thị dialog chi tiết
    id = self.getRecordIdSelected();

    debugger;
    $.ajax({
        url: "/api/employees/" + id,
        method: "GET",
        data: "",
        dataType: "json",
        contentType: "application/json",
        async: false
    }).done(function (response) {

        response['employeeCode'] = self.lastedCode;
        $.ajax({
            url: "/api/employees",
            method: "POST",
            data: JSON.stringify(response),
            contentType: "application/json"
        }).done(function (response) {
            self.loadData();
        }).fail(function (response) {

        })
    })
}


    /**
    * Lấy Id mới nhất của nhân viên
    * Created by: LTPThao (21/10/2020)
    * */
getLastedEmployeeCode() {
    this.lastedCode = 0;
    try {
        var self = this;
        $.ajax({
            url: "/api/employees",
            method: "GET",
            data: "",
            contentType: "application/json",
            dataType: "",
            async: false,
        }).done(function (employee) {
            self.lastedCode = employee[employee.length - 1]["employeeCode"];
            self.lastedCode = self.lastedCode.slice(0, 4) + (parseInt(self.lastedCode.slice(4)) + 1);
            $('#txtEmployeeCode').val($('#txtEmployeeCode').val() + self.lastedCode);
        })
        return self.lastedCode;
    } catch (e) {

    }
}
//#endregion "DuplicateEmployee"
}




