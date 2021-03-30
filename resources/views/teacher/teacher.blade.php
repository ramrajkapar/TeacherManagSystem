<!DOCTYPE html>
<html lang="en">

<head>
    <title>Teacher</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="{{ asset('js/jquery-ui-datepicker/jquery-ui.css')}}">
    <link rel="stylesheet" href="{{ asset('js/jquery-ui-datepicker/style.css')}}">
    <script src="{{ asset('js/jquery-ui-datepicker/jquery-1.12.4.js')}}"></script>
    <script src="{{ asset('js/jquery-ui-datepicker/jquery-ui.js')}}"></script>
    <style>
        .h3_teacher_custom {
            padding: 1rem;
            text-align: center;
        }

        .error {
            color: red;
            font-weight: 500;
        }
    </style>
</head>

<body style="background-color: #fddbe2;">
    <div class="container-fluid">

        <!--Write here body design -->
        <h4 class="h3_teacher_custom bg-primary text-white"><i>Fill the Lecturer's Details:</i></h4>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        @endif

        <form action="{{route('post_teacher')}}" method="post" id="teacher_form" name="teacher_form">
            @csrf
            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="first_name" class="col-md-2 col-form-label">Lecturer's Name:</label>
                <div class="col-md-5">
                    <input type="text" class="form-control" id="name" name="name" placeholder="Enter Lecturer's Name">
                    <label style="color:red;font-weight:700;display:none" id="name_label">Enter Lecturer's Name!</label>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="first_name" class="col-md-2 col-form-label">Gender:</label>
                <div class="col-md-5">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" id="Male" value="Male">
                        <label class="form-check-label" for="boy">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" id="Female" value="Female">
                        <label class="form-check-label" for="girl">Female</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" id="Others" value="Others">
                        <label class="form-check-label" for="girl">Others</label>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="moblile_no" class="col-md-2 col-form-label">Phone No:</label>
                <div class="col-md-5">
                    <input type="number" class="form-control" id="phone" name="phone" placeholder="Enter Phone Number">
                </div>
            </div>

            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="moblile_no" class="col-md-2 col-form-label">E-mail:</label>
                <div class="col-md-5">
                    <input type="email" class="form-control" id="email" name="email" placeholder="Enter E-mail">
                </div>
            </div>

            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="village" class="col-md-2 col-form-label">Address:</label>
                <div class="col-md-5">
                    <input type="text" class="form-control" id="address" name="address" placeholder="Enter Address">
                </div>
            </div>

            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="nationality" class="col-md-2 col-form-label">Nationality:</label>
                <div class="col-md-5">
                    <select class="form-control" id="country_id" name="country_id">
                        <option value="">Select Nationality</option>
                        @foreach($nationalities as $id =>$nationality)
                        <option value="{{$id}}">{{$nationality}}</option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="first_name" class="col-md-2 col-form-label">Date of Birth:</label>
                <div class="col-md-5">
                    <input type="text" class="form-control dob" id="dob" name="dob" placeholder="Enter date of birth">
                </div>
            </div>

            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="first_name" class="col-md-2 col-form-label">Faculty:</label>
                <div class="col-md-5">
                    <select class="form-control" id="faculty_id" name="faculty_id">
                        <option value="">Select Faculty</option>
                        @foreach($faculties as $id => $name)
                        <option value="{{$id}}">{{$name}}</option>
                        @endforeach
                    </select>
                    <label style="color:red; font-weight:700;display:none" id="class_label">Select Faculty<label>
                </div>

            </div>

            <div class="form-group row">
                <div class="col-md-2">
                </div>
                <label for="first_name" class="col-md-2 col-form-label"> Sub Faculty:</label>
                <div class="col-md-5">
                    <select class="form-control" id="subFacultyId" name="subFacultyId[]" multiple="multiple">
                    </select>
                    <label style="color:red; font-weight:700;display:none" id="class_label">Select Faculty<label>
                </div>

            </div>


            <div class="form-group row">
                <div class="offset-md-4 col-md-9">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.min.js"> </script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="{{ asset('js/manage_teacher_form.js')}}"></script>
    <script>
        var messages = {
            ajax_faculties: "{{ URL::route('ajax_faculties') }}",
            data_not_found: "{{ trans('error_message.no_records_found') }}",
            token: "{{ csrf_token() }}",
        };
    </script>
</body>

</html>