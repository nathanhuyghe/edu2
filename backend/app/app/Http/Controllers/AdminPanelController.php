<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\FieldOfStudy;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminPanelController extends Controller
{
    private $roleId;

    public function testUi() {
        return view('adminPanel.ui');
    }

    public function showAdminPanel() {
        return view('adminPanel.overview');
    }

    public function showNewTeacherForm() {
        if (Gate::denies('is-teacher') && Gate::denies('is-admin'))
        {
            return response('', 403);
        }

        return view('adminPanel.newTeacher');
    }

    public function addNewTeacher(Request $request) {
        if (Gate::denies('is-teacher') && Gate::denies('is-admin'))
        {
            return response('', 403);
        }

        $data = $request->validate([
            "name"  =>   'required|max:255',
            "firstname"=>'required|max:255',
            "email" =>   'required|string|email|max:255|unique:users',
            "password"=> 'required|string|min:8',
            'company_id' => ['required', 'integer', Rule::exists(Company::class, 'id')],
        ]);

        $now = date_create()->format('Y-m-d H:i:s');

        DB::table('users')->insert([
            'name' => $data['name'],
            'firstname' => $data['firstname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'email_verified_at' =>  new Carbon('1990-01-01 00:00:00'),
            'role_id' => 4,
            'field_of_study_id' => 2,
            'company_id' => $data['company_id'],
            'created_at' =>  new Carbon($now),
        ]);

        return redirect('/');
    }

    public function showNewStudentForm() {
        Gate::authorize('is-teacher');

        return view('adminPanel.newStudent');
    }

    public function addNewStudent(Request $request) {
        Gate::authorize('is-teacher');

        $data = $request->validate([
            "name"  =>   'required|max:255',
            "firstname"=>'required|max:255',
            "email" =>   'required|string|email|max:255|unique:users',
            "password"=> 'required|string|min:8',
            'company_id' => ['required', 'integer', Rule::exists(Company::class, 'id')],
            'field_of_study_id' => ['required', 'integer', Rule::exists(FieldOfStudy::class, 'id')],
        ]);

        $now = date_create()->format('Y-m-d H:i:s');

        DB::table('users')->insert([
            'name' => $data['name'],
            'firstname' => $data['firstname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'email_verified_at' =>  new Carbon('1990-01-01 00:00:00'),
            'role_id' => 2,
            'field_of_study_id' => $data['field_of_study_id'],
            'company_id' => $data['company_id'],
            'created_at' =>  new Carbon($now),
        ]);

        return redirect('/');
    }

    public function showUploadByCsv() {
        return view ('adminPanel.uploadViaCsv');
    }

    public function postUploadByCsv(Request $request) {
        if(request()->is('admin-panel/upload-teachers-by-csv')) {
            $this->roleId = 4;
            $this->uploadUsersByCsv($request);
        } else if(request()->is('admin-panel/upload-students-by-csv')) {
            $this->roleId = 2;
            $this->uploadUsersByCsv($request);
        }
    }

    private function uploadUsersByCsv(Request $request) {
        $request->validate([
            'file-upload' => 'required|mimes:csv,txt',
        ]);

        $array = $this->csvToArray($request->file('file-upload'));

        if($array) {
            foreach($array as $nestedArray) {
                $headerRow = array_keys($nestedArray);
                $cleanedHeaderRow = $this->cleanHeaderRow($headerRow);
                $validate = $this->validateHeaderRow($cleanedHeaderRow);
                $newArray = array_combine($cleanedHeaderRow, $nestedArray);

                if ($validate) {
                    $this->importLineByLine($newArray);
                } else {
                    dd('error by validate header row');
                }
            }
        }
    }

    private function csvToArray($filename = '', $delimiter = ';') {
        if (!file_exists($filename) || !is_readable($filename))
            return false;

        $header = null;
        $data = array();
        if (($handle = fopen($filename, 'r')) !== false)
        {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== false)
            {
                if (!$header)
                    $header = $row;
                else
                    $data[] = array_combine($header, $row);
            }
            fclose($handle);
        }

        return $data;
    }

    private function validateHeaderRow($headerRow) {
        $validate = false;

        if( strcmp($headerRow[0], "name") == 0
            && strcmp($headerRow[1], "email") == 0
            && strcmp($headerRow[2], "firstname") == 0
        )
        {
            $validate = true;
        }

        return $validate;
    }

    private function cleanHeaderRow($headerRow) {
        $cleanedHeaderRow = array_map('trim', $headerRow);

        return [
                str_replace("\xEF\xBB\xBF",'',$cleanedHeaderRow[0]),
                str_replace("\xEF\xBB\xBF",'',$cleanedHeaderRow[1]),
                str_replace("\xEF\xBB\xBF",'',$cleanedHeaderRow[2])
            ];
    }

    private function importLineByLine($array) {
        $user = User::create([
            'name' => $array['name'],
            'email' => $array['email'],
            'password' => Hash::make('Azerty123'),
            'first_name' => $array['firstname'],
            'role_id' => $this->roleId
        ]);

        $user->save();
    }
}
