<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubFaculty extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_id',
        'name',
        'description',
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
}
