<!DOCTYPE html>
<html lang="en">

<head>
    <title>Teacher list</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">
    <style>
        .h3_teacher_custom {
            padding: 1rem;
            text-align: center;
        }
    </style>
</head>

<body>

    <div class="container">
        <h2 class="h3_teacher_custom bg-primary text-white">The List of Teachers:</h2>
        <table id="teachers_list" width="100%" class="table-bordered  table table-striped table-hover">

            <thead>
                <th>S.No</th>
                <th>Name</th>
                <th>Phone No:</th>
                <th>Email</th>
                <th>Date Of Birth</th>
                <th>Nationality</th>
                <th>Faculty</th>
                <!-- <th>Sub Faculty</th> -->
            </thead>

            <tbody>

                @php
                $i = 1;
                @endphp
                @foreach($teachers as $teacher)

                <tr id="userid_{{$teacher->id}}">

                    <td>{{$i++}} </td>

                    <td>{{$teacher->name}} </td>
                    <td>{{$teacher->phone}} </td>
                    <td>{{$teacher->email}} </td>
                    <td>{{$teacher->dob}} </td>
                    <td>{{$teacher->nationality}} </td>
                    <td>{{$teacher->faculty_name}} </td>
                    <!-- <td>Test </td> -->

                </tr>

                @endforeach

            </tbody>

        </table>

    </div>

    <script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"> </script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.print.min.js"></script>
    <script type="text/javascript" src="{{asset('js/admin_employee.js')}}"></script>
    <script>
        $('#teachers_list').DataTable({
            "lengthMenu": [
                [25, 50, 75, -1],
                [25, 50, 75, "All"]
            ],
            dom: 'Bfrtip',
            buttons: [
                'csv',
            ]
        });
    </script>
</body>

</html>