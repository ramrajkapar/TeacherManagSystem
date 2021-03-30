$('.dob').datepicker({
     dateFormat: 'yy-mm-dd',
     changeMonth: true,
     changeYear: true,
     });

$('#subFacultyId').select2();
$("#teacher_form").validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      },
      address: "required",
      nationality: "required",
      dob: "required",
      faculty_id: "required",
      gender: "required",
    },
    messages: {
      name: "Please enter name",
      phone: "Please enter phone/mobile number",
      email: {
        required: "Please enter email address",
        email: "Enter email address must be in the format of name@domain.com"
      }
    }
  });

  $( "#faculty_id" ).on('change',function() {
    var faculty_id = $("#faculty_id").val();
    $("#subFacultyId").find('option').remove().end();
    if(faculty_id) {
         $.ajax({
                type: "POST",
                url: messages.ajax_faculties,
                data: {
                    "faculty_id": faculty_id,
                    "_token": messages.token
                },
                dataType: "json",
                success: function (obj) {
                    console.log(obj.subfaculties);
                    $(obj.subfaculties).each(function () {
                        $("#subFacultyId").append("<option value=\"" + this.id + "\">" + this.name + "</option>");
                    });
                },
                error: function (errors) {
                    console.log(errors);
                }
            });
    }
});