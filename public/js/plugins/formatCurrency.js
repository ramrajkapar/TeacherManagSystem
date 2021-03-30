(function ($) {
//Format Currency
/**
 * Remove Comma
 * @param {string} value
 * @returns {string}
 */
$.fn.removeComma = function (value) {
    var temp = value.replace(/,/g, '');
    if (isNaN(temp) || temp == '' || temp == undefined) {
        temp = 0;
    }
    return temp;
}

/**
 * Formate Currency
 * @param {array} options
 * @returns {undefined}
 */
$.fn.formatCurrency = function (options) {
    var defaults = {};
    var settings = $.extend({}, defaults, options);
    var value = $(this).val();
    if (value !== undefined) {
        var current_value = $(this).removeComma($(this).val());
    } else {
        var current_value = 0;
    }
    if (current_value != '' && current_value > 0) {
        var num = String(current_value).split("").reverse().join("").replace(/(\d{3}\B)/g, "$1,").split("").reverse().join("");
        $(this).val(num);
    }
}


$(document).on('input', '.floatdigits', function () {
    var invalidChars = /([^0-9\.]+)/gi;
    if (invalidChars.test(this.value)) {
        this.value = this.value.replace(invalidChars, "");
    }

    var rel = $(this).attr('data-digits') || 2;
    var readonly = $(this).attr('readonly');
    var extralimit = parseInt(rel) + 1;
    var num_limit = $(this).attr('data-limit') || 10;
    var result = $(this).val().replace(/,/g, "");
    if ($.isNumeric(result) && result.length <= parseInt(num_limit) + extralimit) {
        if (parseFloat(result)) {
            if (result.includes(".")) {
                if (result.split(".")[1].length > rel) {
                    var array_conv = Array.from(result.split(".")[1]);
                    var output = result.split(".")[0] + '.' + array_conv[0] + array_conv[1];
                    this.value = result.replace(result, output);
                }
            } else if (result.length > num_limit) {
                this.value = result.replace(result, result.substring(0, num_limit));
            }
        }
    } else {
        if (readonly != 'readonly') {
            this.value = result.replace(result, '');
        }
    }
});


/**
 * Handle Blur event on Float Digit and Float class
 */
$(document).on('keyup ,blur', '.floatdigits', function (event) {
    if (event.which >= 37 && event.which <= 40) {
        event.preventDefault();
    }
    var value = $(this).removeComma($(this).val());
    if (value > 0) {
        $(this).formatCurrency();
    } else {
        $(this).val('');
    }
});


$('.remove_comma').click(function () {
    $(".floatdigits").each(function () {
        if ($(this).val() != '') {
            var x = $(this).val();
            x = x.replace(/,/g, '');
            x = parseInt(x, 10);
            $(this).val(x);
            return true;
        }
    })
});

}(jQuery));