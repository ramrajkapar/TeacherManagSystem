<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class country extends Model
{
    use HasFactory;
    protected $fillable = [
        'nationality',
        'country_name'
    ];
    public static function getNationalitiesList()
    {
        return self::all()->pluck('nationality','id');
    }
}
