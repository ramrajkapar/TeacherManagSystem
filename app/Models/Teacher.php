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

    public static function storeTeacherData($teacherData)
    {
        return self::create($teacherData);
    }
}
