$(document).ready(function () {
})
/**
 * Class quản lý các function cho trang Employee
 * Author: LTPThao (26/09/2020)
 * */
class BaseJS {
    //#region "contructor"
    constructor(url) {
        this.loadData();
        this.initEvents();
        this.getDataPosition();
        this.loadDataPosition();
        this.getDataDepartment();
        this.loadDataDepartment();
        /*try {
            this.geturl = url;
            *//*this.getData();
    this.loadData();
    this.initEvents();
    this.getDataPosition();
    this.loadDataPosition();
    this.getDataDepartment();
    this.loadDataDepartment();
    this.getLastedEmployeeCode();
    this.getRecordIdSelected();*//*
    } catch (e) {
        console.log(e);
    }*/
    }
    //#endregion "contructor"

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
        $('#btnAdd').click(self.btnAddOnClick.bind(self));
        $('#btnCancelDialog').click(this.onHideDialog.bind(this));
        $('#btnClose').click(this.onHideDialog.bind(this));
        $('#dlgReminder #btnClose').click(this.onHideDialog.bind(this));
        $('.dlgConfirm-header #btnClose').click(this.onHideDialog.bind(this));
        $('#btnCancelEmployee').click(this.onHideDialog.bind(this));
        $('#btnSave').click(this.btnSaveOnClick.bind(this));
        $('#btnSaveAndAdd').click(this.btnSaveAndAdd.bind(this));
        $('#btnLoadData').click(this.btnReLoadOnClick.bind(this));
        $('table#tbListData').on('click', 'tr', this.rowOnClick);
        $("input[required]").blur(validData.validateRequired);
        $('#btnDelete').click(this.btnDeleteOnClick.bind(this));
        $('#dlgConfirm #btnOk').click(this.btnOkOnClick.bind(this));
        $('#dlgReminder #btnOk').click(this.onHideDialog.bind(this));
        $('#btnEdit').click(this.btnEditOnClick.bind(this));
        $('#btnDuplicate').click(this.btnDuplicateOnClick.bind(this));
        $('#btnNext').click(this.btnNextOnClick.bind(this));
    }
    //#endregion "initEvents"




    //#region "loadData"
    /**
    * Load dữ liệu
    * Author: LTPThao (25/09/2020)
    * */
    loadData() {

    }


    btnAddOnClick() {
    }

    btnSaveAndAdd() {
       
    }
    //#endregion "loadData"

    //#region "btnSaveOnClick - Save data"
    /**-----------------------------------------------------------------------
         * Thực hiện lưu dữ liệu
         * Author: LTPThao (01/10/2020)
         * */
    btnSaveOnClick() {
        this.saveData();
    }

    /**-----------------------------------------------------------------------
        * Thực hiện lưu dữ liệu
        * Author: LTPThao (01/10/2020)
        * */
    saveData() {

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
     * Hiển thị Dialog: Nhắc nhở chọn 1 bản ghi
     * Author: LTPThao(25/5/2020)
     * */
    onShowDialogReminder() {
        $('#model').show();
        $('#dlgReminder').show();
    }
    /**---------------------------------------------------------------------
     * Ẩn Dialog
     * Author: LTPThao (25/05/2020)
     * */
    onHideDialog() {
        $('#model').hide();
        $('#dlgDetail').hide();
        $('#dlgConfirm').hide();
        $('#dlgReminder').hide();
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

    //#region "getRecordIdSelected"
    getRecordIdSelected() {
        var id = null;
        // Lấy thông tin bản ghi đã chọn trong danh sách:
        var recordSelected = $('#tbListData tbody tr.row-selected');
        // Lấy dữ liệu chi tiết của bản ghi đã chọn:
        if (recordSelected.length > 0) {
            id = $(recordSelected).data("keyid");
        }
        return id;
    }
    //#endregion "getRecordIdSelected"

    //#region "DeleteEmployee"
    /**
     * Sự kiện khi click vào button Xóa
     * Created by: LTPThao (21/10/2020)
     * */
    btnDeleteOnClick() {
        var self = this;
        // Lấy id của bản ghi được chọn:
        var id = this.getRecordIdSelected();
        var recordSelected = $('#tbListData tbody tr.row-selected');
        $('#dlgConfirm-title').text("Bạn có chắc muốn xóa nhân viên " + $('.row-selected td:nth-child(2)').text() + " không?");

        if (!id) {
            this.onHideDialog();
            this.onShowDialogReminder();
        } else {
            this.onShowDialogConfirm();
        }
    }
    /**
     * Sự kiện khi click vào button OK của dialog xác nhận xóa 1 nhân viên
     * Created by: LTPThao (21/10/2020)
     * */
    btnOkOnClick() {
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
                this.onShowDialogConfirm(noti);
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

    }
    //#endregion "UpdateEmployee"

    //#region "DuplicateEmployee"
    /**
     * Sự kiện nhân bản nhân viên
     * Created by: LTPThao (21/10/2020)
     * */
    btnDuplicateOnClick() {
        var self = this;
        var trSelected = $('#tbListData tbody tr.row-selected');
        
        var id = 0;
        if (trSelected.length > 0) {
            // Hiển thị dialog chi tiết
            id = self.getRecordIdSelected();
            $.ajax({
                url: "/api/employees/" + id,
                method: "GET",
                data: "",
                dataType: "json",
                contentType: "application/json",
                async: false
            }).done(function (employee) {

                //response['employeeCode'] = self.lastedCode;
                self.onShowDialog();
                var objectDetail = employee;
                var inputs = $("input[fieldName], select[fieldName]");
                $.each(inputs, function (index, input) {
                    var fieldName = $(input).attr('fieldName');
                    if (fieldName == "dateOfBirth" || fieldName == 'identityDate' || fieldName == 'joinDate' || fieldName == 'identityNumber') {
                        $(input).val(commonJS.formatDateISO(objectDetail[fieldName]));
                    }
                    else if (fieldName == "employeeCode") {
                        $(input).val(self.getLastedEmployeeCode);
                    }
                    else {
                        $(input).val(objectDetail[fieldName]);
                    }
                })
                self.getLastedEmployeeCode();

            }).fail(function (response) {

            })
        } else {
            this.onHideDialog();
            this.onShowDialogReminder();
        }

    }



    //#endregion "DuplicateEmployee"

    //Khi nhấn button Next thì chuyển tới trang tiếp theo
    btnNextOnClick() {
        var currentPageNumber = $('#numPage').val();
        if (currentPageNumber) {
            $('#numPage').val(parseInt(currentPageNumber) + 1);
        }
    }
}




