<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\country;
use App\Models\Faculty;
use App\Models\SubFaculty;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function getTeacher()
    {
        $nationalities = Country::getNationalitiesList();
        //dd($nationalities);
        $faculties = Faculty::getFacultyList();
        return view('teacher.teacher',['nationalities'=>$nationalities,'faculties'=>$faculties]);
    }

    public function storeTeacher(Request $request)
    {
        $teacherData = $request->all();
        //dd($teacherData);
        Teacher::storeTeacherData($teacherData);
    }

    public function getSubFacultiesByFacultyId(Request $request)
    {
        $subfaculties = Faculty::find($request->faculty_id)->subfaculties()->select('id','name')->get();
        return response()->json(['subfaculties'=>$subfaculties],200);
    }
}
