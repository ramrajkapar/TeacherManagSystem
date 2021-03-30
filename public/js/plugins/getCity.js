try {
    (function ($) {
        $.fn.getCity = function (options) {

            var defaults = {
                url: messages.ajax_get_city,
                isCitySelected: 0,
                cmbCity: $('select', $(this).parent().parent().next()),
                selectText: '<option value="">Please Select</option>',
                listOfSelected: '',
                block: '',
                unBlock: '',
                isChecked: false,
                isDuplicate: false,
                isFire: false
            };

            var settings = $.extend({}, defaults, options);

            return this.each(function () {

                $(this).change(function () {
                    if (settings.cmbCity !== '') {
                        varCity = settings.cmbCity;
                    } else {
                        if (settings.divCount == 2)
                        {
                            var varCity = $(this).parent().parent().next().first().find('select');
                        } else {
                            var varCity = $(this).parent().next().first().find('select');
                        }
                    }

                    if ($(this).val()) {
                        $(this).attr("disabled", true);
                        $(this).before("<span class='docLoader' style='position: absolute;'><img src=" + messages.ajax_image + "></span>");
                        $.post(settings.url, {id: $(this).val(), _token: messages._token}, function (data) {
                            varCity.find('option').remove().end();
                            var city_text = '<option value="">Please Select</option>';
                            var first_option = settings.defaultText;
                            if (city_text !== undefined) {
                                first_option = city_text;
                            }
                            varCity.append(first_option);
                            $.each(data, function (index, city) {
                                var check = '';
                                if (city.id == settings.isCitySelected) {
                                    check = "selected";
                                }
                                //alert(check);
                                // code for maping
                                var ocity_name = city.city_name;
                                var mcity_name = ocity_name.toLowerCase();
                                mcity_name = mcity_name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                                    return letter.toUpperCase();
                                });
                                varCity.append('<option value="' + city.id + '" ' + check + '>' + mcity_name + '</option>');
                            });

                            $(this).removeAttr("disabled");
                            $(".docLoader").remove();
                        }, 'json');
                        $(this).removeAttr("disabled");
                    } else {
                        var city_text = 'Please Select';
                        var first_option = settings.defaultText;
                        if (city_text !== undefined) {
                            first_option = city_text;
                        }
                        varCity.find('option').remove().end();
                        varCity.append('<option value="">Please Select</option>');
                    }
                });
                if (settings.isFire) {
                    $(this).change();
                }

            });
            return true;
        };

        // For get State and City By Zipcode
        $(document).on("input", "#zipcode, .zipcode", function (event) {
            if (!event.ctrlKey) {
                var zipcodeval = $(this).val();
                if (zipcodeval.length === 5 && !isNaN(zipcodeval) && zipcodeval != "00000") {
                    var stateId = $(this).parent().parent().next().find('select').attr('id');
                    var cityId = $(this).parent().parent().next().next('div').find('select').attr('id');
                    $(this).blur();
                    ajaxCall(zipcodeval, stateId, cityId);
                } else {
                    $(this).parent().parent().next().find('select').val("");
                    $(this).parent().parent().next().next('div').find('select').val("");

                }
//				
            }
        });

        function ajaxCall(zipcodeval, stateid, cityid) {
            var loader1 = $("<span class='docLoader' style='position: absolute;'><img src=" + messages.ajax_image + "></span>");
            $.ajax({
                type: "POST",
                url: messages.get_state_city,
                data: {zipcodeval: zipcodeval, _token: messages._token},
                cache: false,
                timeout: 12000,
                beforeSend: function () {
                    loader1.show();
                },
                success: function (data) {
                    if (data.success == true) {
                        var stateName = data.response.state_name;
                        if (stateName.length > 0) {
                            $("#" + stateid + " option").filter(function () {
                                return $(this).text() === stateName;
                            }).prop("selected", true).trigger('change');
                            var cityName = data.response.city_name;
                            $("<span class='citydocLoader' style='position: absolute;'><img src=" + messages.ajax_image + "></span>").insertBefore('#' + cityid);
                            setTimeout(function () {
                                if (cityName.length > 0) {
                                    $("#" + cityid + " option").filter(function () {
                                        return $(this).text() === cityName;
                                    }).prop("selected", true);
                                    $('.citydocLoader').remove();
                                }
                            }, 9000);

                            loader1.hide();
                        }
                    } else {
                        loader1.hide();
                        $("#" + stateid + " option").filter(function () {
                            return $(this).text() == "Select State";
                        }).prop("selected", true).trigger('change');
                    }
                }, error: function (x, t, m) {
                    if (t === "timeout") {
                        loader1.hide();
                    } else {
                        loader1.hide();
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