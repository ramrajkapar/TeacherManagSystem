try {
    (function ($) {
        $.fn.citySelector = function (options) {
            var defaults = {
                parent_div: '.addressContainer',
                postcode: '.postcode',
                no_req_postcode: '',
                state: '.state_id',
                city_id: '.city_id',
                city_name: '.city_name',
                gnafAddress: '.addressBloack',
                url: messages.get_state_postcode_by_city,
                condition: false,
                valid_postcode: messages.valid_postcode,
                record_count:200
            };
            var settings = $.extend({}, defaults, options);
            var find_parent = $(this).parents(settings.parent_div);
            var cityVal = $(this).val();
            var stateVal = find_parent.find(settings.state).val();
            var token = default_messages.csrf_token;
            var record_count = settings.record_count;
            find_parent.find(settings.city_id).val('');            
            find_parent.find(settings.postcode).removeError({current_obj: true});
            var search_txt = (stateVal=='') ? cityVal : cityVal+'##'+stateVal;
            $(this).autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: settings.url,
                        data: {search_txt: search_txt,record_count: record_count, _token: token},
                        success: response,
                        dataType: 'json'
                    });
                },
                minLength: 1,
                scrollHeight: 10,
                max: 10,
                scroll: true,
                delay: 500,
                appendTo: $(this).parent(),
                select: function (event, ui) {
                    ui.item.value = ui.item.city_name.trim();
                    find_parent.find(settings.state).removeError({current_obj: true});
                    find_parent.find(settings.city_name).removeError({current_obj: true});
                    find_parent.find(settings.city_id).removeError({current_obj: true});
                    find_parent.find(settings.postcode).removeError({current_obj: true});                    
                    find_parent.find(settings.state).val(ui.item.state_id);
                    find_parent.find(settings.city_name).val(ui.item.city_name);                   
                    find_parent.find(settings.city_id).val(ui.item.city_id);
                    if (settings.condition == true) {
                        //find_parent.find(settings.city).val(ui.item.city_id);
                        /*
                         setTimeout(function () {
                         find_parent.find(settings.postcode).val(ui.item.postcode.trim());
                         $.fn.removeError(settings.postcode);
                         }, 10);                        
                         $.fn.removeError(settings.postcode);
                         */
                    } else {
                        /*
                        setTimeout(function () {
                             
                            //find_parent.find(settings.state).attr('rel', ui.item.city_id);
                            //find_parent.find(settings.state).trigger("change");
                           //(".docLoader").remove();
                        }, 1000);
                        */
                    }
                    find_parent.find(settings.postcode).nextAll("label.error").fadeOut();
                }, response: function (event, ui) {
                    // ui.content is the array that's about to be sent to the response callback.
                    if (ui.content.length === 0) {
                        /**
                         * Remove postcode if invalid
                         */
                        find_parent.find(settings.city_id).val('');
                        find_parent.find(settings.city_name).val('');
                        //find_parent.find(settings.postcode).trigger("blur");
                        //find_parent.find(settings.state).val('');
                        if (settings.condition == true) {
                            find_parent.find(settings.city_id).val('');
                            find_parent.find(settings.city_name).val('');
                        }
                        setTimeout(function () {
                            find_parent.find(settings.state).trigger("change");
                        }, 1000);
                    } else {

                    }
                }
            });
        }
        
        $.fn.postCodeSelector = function (options) {
            var defaults = {
                parent_div: '.addressContainer',
                postcode: '.postcode',
                no_req_postcode: '',
                state: '.state_id',
                city_id: '.city_id',
                city_name: '.city_name',
                gnafAddress: '.addressBloack',
                url: messages.get_city_state_by_postcode,
                condition: false,
                valid_postcode: messages.valid_postcode,
                record_count:200,
                postcode_without_state: false
            };
            var settings = $.extend({}, defaults, options);
            var find_parent = $(this).parents(settings.parent_div);
            var postcodeVal = $(this).val();
            var cityVal = find_parent.find(settings.city_id).val();
            var stateVal = find_parent.find(settings.state).val();
            var token = default_messages.csrf_token;
            var record_count = settings.record_count;
            if(settings.postcode_without_state == true) {
                find_parent.find(settings.state).val('');
                find_parent.find(settings.city_id).val('');
                find_parent.find(settings.city_name).val('');
            }
            
            cityVal = (typeof cityVal === "undefined") ? '' : cityVal;
            stateVal = (typeof stateVal === "undefined") ? '' : stateVal;
            find_parent.find(settings.postcode).removeError({current_obj: true});
            var search_txt = cityVal + '##' + postcodeVal + '##' + stateVal;
            $(this).autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: settings.url,
                        data: {search_txt: search_txt,record_count: record_count, _token: token},
                        success: response,
                        dataType: 'json'
                    });
                },
                minLength: 3,
                scrollHeight: 10,
                max: 10,
                scroll: true,
                delay: 500,
                appendTo: $(this).parent(),
                select: function (event, ui) {
                    ui.item.value = ui.item.postcode.trim();
                    find_parent.find(settings.state).removeError({current_obj: true});
                    find_parent.find(settings.city_name).removeError({current_obj: true});
                    find_parent.find(settings.city_id).removeError({current_obj: true});
                    find_parent.find(settings.postcode).removeError({current_obj: true});                    
                    find_parent.find(settings.state).val(ui.item.state_id);
                    find_parent.find(settings.city_name).val(ui.item.city_name);
                    find_parent.find(settings.city_id).val(ui.item.city_id);                    
                    if (settings.condition == true) {
                        //find_parent.find(settings.city).val(ui.item.city_id);
//                        setTimeout(function () {
//                            find_parent.find(settings.postcode).val(ui.item.postcode.trim());
//                            $.fn.removeError(settings.postcode);
//                        }, 10);
//                        $.fn.removeError(settings.postcode);
                    } else {
//                        setTimeout(function () {
//                            //find_parent.find(settings.state).attr('rel', ui.item.city_id);
//                            //find_parent.find(settings.state).trigger("change");
//                           //(".docLoader").remove();
//                        }, 1000);
                    }
                    find_parent.find(settings.postcode).nextAll("label.error").fadeOut();
                }, response: function (event, ui) {
                    // ui.content is the array that's about to be sent to the response callback.
                    if (ui.content.length === 0) {
                        /**
                         * Remove postcode if invalid
                         */
                        find_parent.find(settings.postcode).val('');
                        find_parent.find(settings.postcode).trigger("blur");
                        //find_parent.find(settings.state).val('');
                        if (settings.condition == true) {
                            find_parent.find(settings.city_id).val('');
                            find_parent.find(settings.city_name).val('');
                        }
                        setTimeout(function () {
                            find_parent.find(settings.state).trigger("change");
                        }, 1000);
                    } else {

                    }
                }
            });
        }
    }(jQuery));
} catch (e) {
    if (typeof console !== 'undefined') {
        console.log(e);
    }
}