<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|unique:teachers',
            'name' => 'required|string|max:255',
            'phone' => 'required|max:12|unique:teachers',
            'gender' => 'required',
            'address' => 'required',
            'country_id' => 'required',
            'faculty_id' => 'required',
            "subFacultyId.*"  => "required|integer",
        ];
    }

         /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'Email is required!',
            'name.required' => 'Name is required!',
            'email.email' => 'Enter valid Email is required!',
            'phone.required' => 'Phone number is required!',
            'gender.required' => 'Select the gender is required!',
            'country_id.required' => 'Nationality is required!',
            'faculty_id.required' => 'Faculty is required!',
        ];
    }
}
