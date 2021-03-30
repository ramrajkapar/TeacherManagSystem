<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function subfaculties()
    {
        return $this->hasMany(SubFaculty::class);
    }

    public static function getFacultyList()
    {
        return self::all()->pluck('name','id');
    }

}
