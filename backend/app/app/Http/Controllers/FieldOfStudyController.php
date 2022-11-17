<?php

namespace App\Http\Controllers;

use App\Models\FieldOfStudy;
use Illuminate\Http\Request;

class FieldOfStudyController extends Controller
{
    public function getAllFieldOfStudies() {
        return FieldOfStudy::all();
    }
}
