<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Teacher extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'gender',
        'phone',
        'email',
        'address',
        'country_id',
        'dob',
        'faculty_id'
    ];

    public function teacherSubfaculties()
    {
        return $this->hasMany(TeacherSubFaculty::class);
    }

    public static function storeTeacherData($teacherData)
    {
        return self::create($teacherData);
    }

    public static function getTeacherList()
    {
        $teacher = self::join('faculties','teachers.faculty_id','=','faculties.id')
                ->join('countries','teachers.country_id','=','countries.id')
                ->select('teachers.id','teachers.name','teachers.phone','teachers.email','teachers.dob','faculties.name as faculty_name','countries.nationality')
                ->get();

                /**
                 * I will convert that query on eloquent query builder later.
                 */
                $query = "select GROUP_CONCAT(sub_faculties.name SEPARATOR ' ') as subfaculties,ts.teacher_id from sub_faculties JOIN (select teacher_sub_faculties.* FROM teachers join teacher_sub_faculties on teachers.id=teacher_sub_faculties.teacher_id) AS ts ON sub_faculties.id = ts.sub_faculty_id group by ts.teacher_id";
                $sub_faculty = DB::select($query);

                $faculties = array();
                foreach($sub_faculty as $sub)
                {
                    $faculties[$sub->teacher_id] = $sub->subfaculties;
                }
            return [$teacher,$faculties];

    }
}
