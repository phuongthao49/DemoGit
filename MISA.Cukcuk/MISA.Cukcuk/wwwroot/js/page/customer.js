$(document).ready(function () {
    customerJS = new CustomerJS("/api/customers");
})

/**
 * Class quản lý các function cho trang Customer
 * Author: LTPThao (26/09/2020)
 * */
class CustomerJS extends BaseJS {
    constructor(url) {

        super(url);
    }

    /**--------------------------------------------------------
    * Gán sự kiện cho các thành phần
    * Author: LTPThao (25/09/2020)
    * */
    initEvents() {
        super.initEvents();
    }

    onShowDialogConfirm() {
        $('#model').show();
        $('#dlgConfirm').show();
    }

    /**---------------------------------------------------------------------
     * Ẩn Dialog
     * Author: LTPThao (25/05/2020)
     * */
    onHideDialogConfirm() {
        $('#model').hide();
        $('#dlgConfirm').hide();
    }
}



