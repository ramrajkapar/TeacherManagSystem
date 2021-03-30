
// JavaScript I wrote to limit what types of input are allowed to be keyed into a textbox
var allowedSpecialCharKeyCodes = [46,8,37,39,35,36,9];
var numberKeyCodes = [44,45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
var commaKeyCode = [188];
var decimalKeyCode = [190,110];

function numbersOnly(event) {
    var legalKeyCode =
        (!event.shiftKey && !event.ctrlKey && !event.altKey)
            &&
        (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
            ||
        jQuery.inArray(event.keyCode, numberKeyCodes) >= 0);

    if (legalKeyCode === false)
        event.preventDefault();
}

function numbersAndCommasOnly(event) {
    var legalKeyCode =
        (!event.shiftKey && !event.ctrlKey && !event.altKey)
            &&
        (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
            ||
        jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
            ||
        jQuery.inArray(event.keyCode, commaKeyCode) >= 0);

    if (legalKeyCode === false)
        event.preventDefault();
}

function decimalsOnly(event) {
    var legalKeyCode =
        (!event.shiftKey && !event.ctrlKey && !event.altKey)
            &&
        (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
            ||
        jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
            ||
        jQuery.inArray(event.keyCode, commaKeyCode) >= 0
            ||
        jQuery.inArray(event.keyCode, decimalKeyCode) >= 0);

    if (legalKeyCode === false)
        event.preventDefault();
}

function currenciesOnly(event) {
    var legalKeyCode =
        (!event.shiftKey && !event.ctrlKey && !event.altKey)
            &&
        (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
            ||
        jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
            ||
        jQuery.inArray(event.keyCode, commaKeyCode) >= 0
            ||
        jQuery.inArray(event.keyCode, decimalKeyCode) >= 0);

    // Allow for $
    if (!legalKeyCode && event.shiftKey && event.keyCode == 52)
        legalKeyCode = true;
    // Allow for -
    if (!legalKeyCode && event.shiftKey && event.keyCode == 45)
        legalKeyCode = true;

    if (legalKeyCode === false)
        event.preventDefault();
}


(function($) {

        $.formatCurrency = {};

        $.formatCurrency.regions = [];

        // default Region is en
        $.formatCurrency.regions[''] = {
                symbol: '',
                positiveFormat: '%s%n',
                negativeFormat: '-%s%n',
                decimalSymbol: '.',
                digitGroupSymbol: ',',
                groupDigits: true
        };

        $.fn.formatCurrency = function(destination, settings) {

                if (arguments.length == 1 && typeof destination !== "string") {
                        settings = destination;
                        destination = false;
                }

                // initialize defaults
                var defaults = {
                        name: "formatCurrency",
                        colorize: false,
                        region: '',
                        global: true,
                        roundToDecimalPlace: 2, // roundToDecimalPlace: -1; for no rounding; 0 to round to the dollar; 1 for one digit cents; 2 for two digit cents; 3 for three digit cents; ...
                        eventOnDecimalsEntered: false,
            negativeallowed:false,
                };
                // initialize default region
                defaults = $.extend(defaults, $.formatCurrency.regions['']);
                // override defaults with settings passed in
                settings = $.extend(defaults, settings);

                // check for region setting
                if (settings.region.length > 0) {
                        settings = $.extend(settings, getRegionOrCulture(settings.region));
                }
                settings.regex = generateRegex(settings);

                return this.each(function() {
                        $this = $(this);                        
                        // get number
                        var num = '0';
                        num = $this[$this.is('input, select, textarea') ? 'val' : 'html']();

                        //identify '(123)' as a negative number
                        if (num.search('\\(') >= 0) {
                                num = '-' + num;
                        }

                        if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
                                return;
                        }

                        // if the number is valid use it, otherwise clean it
                        if (isNaN(num)) {
                                // clean number
                                num = num.replace(settings.regex, '');
                               
                                if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
                                        num = '0';
                                }
                               
                                if (settings.decimalSymbol != '.') {
                                        num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arithmetic
                                }
                               
                                if (isNaN(num) && num !== '-' && settings.negativeallowed) {
                                        num = '0';
                                }

                if(!settings.negativeallowed && num === '-') {
                                        num = '0';
                                }
                        }
                       
                        // evalutate number input
                        var numParts = String(num).split('.');
                        var isPositive = (num == Math.abs(num));
                        var hasDecimals = (numParts.length > 1);
                        var decimals = (hasDecimals ? numParts[1].toString() : '0');
                        var originalDecimals = decimals;
                       
                        // format number                       
                        //num = Math.abs(numParts[0]);
                        num = isNaN(numParts[0]) && num === '-' ? num : Math.abs(numParts[0]);
                        //num = isNaN(num) ? 0 : num;
                        if (settings.roundToDecimalPlace >= 0) {
                                decimals = parseFloat('1.' + decimals); // prepend "0."; (IE does NOT round 0.50.toFixed(0) up, but (1+0.50).toFixed(0)-1
                                decimals = decimals.toFixed(settings.roundToDecimalPlace); // round
                                if (decimals.substring(0, 1) == '2') {
                                        num = Number(num) + 1;
                                }
                                decimals = decimals.substring(2); // remove "0."
                        }
                        num = String(num);

                        if (settings.groupDigits) {
                                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                                        num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
                                }
                        }

                        if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
                                num += settings.decimalSymbol + decimals;
                        }

                        // format symbol/negative
                        var format = isPositive ? settings.positiveFormat : settings.negativeFormat;
                        var money = format.replace(/%s/g, settings.symbol);                       
                        money = num === '-' ? money.replace(/%n/g, '')  : money.replace(/%n/g, num);

                        // setup destination
                        var $destination = $([]);
                        if (!destination) {
                                $destination = $this;
                        } else {
                                $destination = $(destination);
                        }
                        // set destination
                        $destination[$destination.is('input, select, textarea') ? 'val' : 'html'](money);

                        if (
                                hasDecimals &&
                                settings.eventOnDecimalsEntered &&
                                originalDecimals.length > settings.roundToDecimalPlace
                        ) {
                                $destination.trigger('decimalsEntered', originalDecimals);
                        }

                        // colorize
                        if (settings.colorize) {
                                $destination.css('color', isPositive ? 'black' : 'red');
                        }
                });
        };

        // Remove all non numbers from text
        $.fn.toNumber = function(settings) {
                var defaults = $.extend({
                        name: "toNumber",
                        region: '',
                        global: true
                }, $.formatCurrency.regions['']);

                settings = jQuery.extend(defaults, settings);
                if (settings.region.length > 0) {
                        settings = $.extend(settings, getRegionOrCulture(settings.region));
                }
                settings.regex = generateRegex(settings);

                return this.each(function() {
                        var method = $(this).is('input, select, textarea') ? 'val' : 'html';
                        $(this)[method]($(this)[method]().replace('(', '(-').replace(settings.regex, ''));
                });
        };

        // returns the value from the first element as a number
        $.fn.asNumber = function(settings) {
                var defaults = $.extend({
                        name: "asNumber",
                        region: '',
                        parse: true,
                        parseType: 'Float',
                        global: true
                }, $.formatCurrency.regions['']);
                settings = jQuery.extend(defaults, settings);
                if (settings.region.length > 0) {
                        settings = $.extend(settings, getRegionOrCulture(settings.region));
                }
                settings.regex = generateRegex(settings);
                settings.parseType = validateParseType(settings.parseType);

                var method = $(this).is('input, select, textarea') ? 'val' : 'html';
                var num = $(this)[method]();
                num = num ? num : "";
                num = num.replace('(', '(-');
                num = num.replace(settings.regex, '');
                if (!settings.parse) {
                        return num;
                }

                if (num.length == 0) {
                        num = '0';
                }

                if (settings.decimalSymbol != '.') {
                        num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arthmetic
                }

                return window['parse' + settings.parseType](num);
        };

        function getRegionOrCulture(region) {
                var regionInfo = $.formatCurrency.regions[region];
                if (regionInfo) {
                        return regionInfo;
                }
                else {
                        if (/(\w+)-(\w+)/g.test(region)) {
                                var culture = region.replace(/(\w+)-(\w+)/g, "$1");
                                return $.formatCurrency.regions[culture];
                        }
                }
                // fallback to extend(null) (i.e. nothing)
                return null;
        }

        function validateParseType(parseType) {
                switch (parseType.toLowerCase()) {
                        case 'int':
                                return 'Int';
                        case 'float':
                                return 'Float';
                        default:
                                throw 'invalid parseType';
                }
        }
       
        function generateRegex(settings) {
                if (settings.symbol === '') {
                        return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g");
                }
                else {
                        var symbol = settings.symbol.replace('$', '\\$').replace('.', '\\.');          
                        return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g");
                }      
        }
        //popup read more        
        $("a.redmr").click(function(){
            $("a.redmr").toggleClass("plus");
        });


})(jQuery);

$.fn.removeComma = function (value) {
    var temp = value.replace(/,/g, '');
    if (isNaN(temp) || temp == '' || temp == undefined) {
        temp = 0;
    }
    return temp;
};

$('.remove_comma').click(function () {
    $(".addcommas").each(function () {
        if ($(this).val() != '') {
            var x = $(this).val();
            x = x.replace(/,/g, '');
            x = parseFloat(x, 10);
            $(this).val(x);
            return true;
        }
    });
});


/**
 * var format = function(num){
	var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
	if(str.indexOf(".") > 0) {
		parts = str.split(".");
		str = parts[0];
	}
	str = str.split("").reverse();
	for(var j = 0, len = str.length; j < len; j++) {
		if(str[j] != ",") {
			output.push(str[j]);
			if(i%3 == 0 && j < (len - 1)) {
				output.push(",");
			}
			i++;
		}
	}
	formatted = output.reverse().join("");
	return("$" + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
};
$(function(){
    $("#currency").keyup(function(e){
        $(this).val(format($(this).val()));
    });
});
            
            another 
            
            function format1(n, currency) {
    return currency + " " + n.toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

function format2(n, currency) {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

var numbers = [1, 12, 123, 1234, 12345, 123456, 1234567, 12345.67];

document.write("<p>Format #1:</p>");
for (var i = 0; i < numbers.length; i++) {
    document.write(format1(numbers[i], "£") + "<br />");
}

document.write("<p>Format #2:</p>");
for (var i = 0; i < numbers.length; i++) {
    document.write(format2(numbers[i], "$") + "<br />");
}            
            
 */

/** Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return negative + symbol + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
**/