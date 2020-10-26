/** --------------------------------------
 * Đối tượng js chứa các hàm sử dụng chung
 * Author: LTPThao (17/10/2020)
 * ---------------------------------------*/
var commonJS = {
    /**
     * Hàm validate money
     * @param {any} money
     */
    formatMoney(money) {
        try {
            if (money != null) {
                return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&,');
            } else {
                return null;
            }

        } catch (e) {
        }
    },
    formatPhone(phone) {
        try {
            if (phone != null) {
                phone = parseInt(phone);
                return phone.toFixed(2).replace(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/);
            } else {
                return null;
            }

        } catch (e) {
        }
    },

    /**
     * Hàm valide ngày tháng năm
     * @param {any} date
     */
    formatDate(date) {
        try {
            if (date != null) {
                datetime = new Date(date)
                var dd = String(datetime.getDate()).padStart(2, '0');
                var mm = String(datetime.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = datetime.getFullYear();

                datetime = dd + '/' + mm + '/' + yyyy;
                return datetime;
            }
            else {
                return null;
            }
        } catch (e) {
        }
    },
    /**
     * Hàm validate ngày tháng cho hàm update data
     * @param {any} date
     */
    formatDateISO(date) {
        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        return today;
    },

    showLoading() {
        $('.loading-box').show();
    },

    hideLoading() {
        $('.loading-box').hide();
    }
}
Number.prototype.formatMoney = function () {
    return this.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}



