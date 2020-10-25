$(document).ready(function () {
    $('input[required]').blur(this.initEventValidRequired);
})
var validData = {
    //TODO: cần cải tiến
    /**---------------------------------------------------------
     * Validate input bắt buộc (dialog)
     * Author: LTPThao (1/10/2020)
     * */
    initEventValidRequired: function() {
            validData.validateRequired(this);
    },

    /**----------------------------------------------------------
     * Thực hiện validate các trường bắt buộc nhập
     * @param {object} input selector
     * Author: LTPThao (01/10/2020)
     */
    validateRequired: function (input) {
        var value = $(this).val();
        //Thực hiện kiểm tra xem dữ liệu có nhập hay không (khoảng trắng hay null)
        if (!value || !(value && value.trim())) {
            $(this).addClass('require-error');
            $(this).attr('title', 'Trường này không được phép để trống!');
            return false;
        } else {
            $(this).removeClass('require-error');
            $(this).removeAttr('title');
            return true;
        }
    },

    /**------------------------------------------------
     * Thực hiện validate các trường bắt buộc nhập
     * @param {object} input selector
     * Author: LTPThao (01/10/2020)
     */
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}