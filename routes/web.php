<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/teacher-form', [App\Http\Controllers\TeacherController::class, 'getTeacherForm'])->name('get_teacher');
Route::post('/teacher', [App\Http\Controllers\TeacherController::class, 'storeTeacher'])->name('post_teacher');
Route::get('/teacher-list', [App\Http\Controllers\TeacherController::class, 'getTeacherList'])->name('teacher_list');

/**
 * Routing For ajax
 */
Route::post('/faculty-id', [App\Http\Controllers\TeacherController::class, 'getSubFacultiesByFacultyId'])->name('ajax_faculties');
