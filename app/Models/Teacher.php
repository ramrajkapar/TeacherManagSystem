<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        return self::join('faculties','teachers.faculty_id','=','faculties.id')
                ->join('countries','teachers.country_id','=','countries.id')
                ->select('teachers.id','teachers.name','teachers.phone','teachers.email','teachers.dob','faculties.name as faculty_name','countries.nationality')
                ->get();
    }
}
