$(function () {
    $(".dob").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
    });

    $("#subFacultyId").select2();

    $("#teacher_form").validate({
        rules: {
            name: "required",
            phone: "required",
            email: {
                required: true,
                email: true,
            },
            address: "required",
            country_id: "required",
            dob: "required",
            faculty_id: "required",
            gender: "required",
        },
        messages: {
            name: "Please enter name",
            phone: "Please enter phone/mobile number",
            email: {
                required: "Please enter email address",
                email: "Enter email address must be in the format of name@domain.com",
            },
            address: "Please enter address",
            country_id: "Please select nationality",
            faculty_id: "Please select faculty",
            gender: "Please select gender",
        },
    });

    var subfaculties;
    $("#faculty_id").on("change", function () {
        var faculty_id = $("#faculty_id").val();
        $("#subFacultyId").find("option").remove().end();
        if (faculty_id) {
            $.ajax({
                type: "POST",
                url: messages.ajax_faculties,
                data: {
                    faculty_id: faculty_id,
                    _token: messages.token,
                },
                dataType: "json",
                success: function (obj) {
                    console.log(obj.subfaculties);
                    subfaculties = obj.subfaculties;
                    $(obj.subfaculties).each(function () {
                        $("#subFacultyId").append(
                            '<option value="' +
                                this.id +
                                '">' +
                                this.name +
                                "</option>"
                        );
                    });
                },
                error: function (errors) {
                    console.log(errors);
                },
            });
        }
    });

    // $(document).on("click", ".custom_add_btn", function () {
    //     $(subfaculties).each(function () {
    //         $("#subFacultyId2").append(
    //             '<option value="' + this.id + '">' + this.name + "</option>"
    //         );
    //     });
    //     setTimeout(function () {
    //       $("#subFacultyId2").select2();
          
    //   }, 100);
    //   $('#Custom_add').removeClass('d-none');
    
    // });



    $(document).on("click", ".custom_add_btn", function () {
              var content = `<div class="form-group row">
        <div class="col-md-2">
        </div>
        <label for="first_name" class="col-md-2 col-form-label"> Custom Faculty:</label>
        <div class="col-md-5">
            <select class="form-control" id="subFacultyIdSecond" name="subFacultyId2[]" multiple="multiple">`;
            $(subfaculties).each(function () {
      
              content += '<option value="' + this.id + '">' + this.name + "</option>";
                  
              });
              content += `
            </select>
        </div>
      
      </div>`;
      
      $("#add_custom_field").append(content); 
            //   setTimeout(function () {
            //     $("#subFacultyIdSecond").select2();
                
            // }, 10);
            $("#subFacultyIdSecond").select2();
            
      });
      
    
});
