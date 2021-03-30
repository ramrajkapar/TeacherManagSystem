<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherSubFaculty extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'sub_faculty_id',
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
