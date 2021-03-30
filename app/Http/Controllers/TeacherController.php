<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherStoreRequest;
use Illuminate\Http\Request;
use App\Models\country;
use App\Models\Faculty;
use App\Models\SubFaculty;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function getTeacherForm()
    {
        $nationalities = Country::getNationalitiesList();
        $faculties = Faculty::getFacultyList();
        return view('teacher.teacher', ['nationalities' => $nationalities, 'faculties' => $faculties]);
    }

    public function storeTeacher(TeacherStoreRequest $request)
    {
        $validated = $request->validated();
        $teacherData = $request->all();
        $teacher = Teacher::storeTeacherData($teacherData);

        $subFacultyIds = $request->subFacultyId;
        if ($teacher) {
            foreach ($subFacultyIds as $subFaculty_Id) {
                $teacher->teacherSubfaculties()->create(['teacher_id' => $teacher->id, 'sub_faculty_id' => $subFaculty_Id]);
            }
        }

        return redirect()->back()->withSuccess(['success' => 'Table Created Successfully']);
    }

    public function getTeacherList()
    {
        $teachers = Teacher::getTeacherList();
        
        return view('teacher.teachers_list', ['teachers' => $teachers[0], 'subfaculties' => $teachers[1]]);
    }

    public function getSubFacultiesByFacultyId(Request $request)
    {
        $subfaculties = Faculty::find($request->faculty_id)->subfaculties()->select('id', 'name')->get();
        return response()->json(['subfaculties' => $subfaculties], 200);
    }
}
