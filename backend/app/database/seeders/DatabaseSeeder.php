<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        DB::table('roles')->insert([
            'role' => 'admin'
        ]);

        DB::table('roles')->insert([
            'role' => 'student'
        ]);

        DB::table('roles')->insert([
            'role' => 'mentor'
        ]);
        DB::table('roles')->insert([
            'role' => 'teacher'
        ]);

        DB::table('companies')->insert([
            'name' => 'Odisee',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('companies')->insert([
            'name' => 'Endare',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('companies')->insert([
            'name' => 'Google',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('companies')->insert([
            'name' => 'AB Inbev',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('field_of_studies')->insert([
            'description' => 'ICT',
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('field_of_studies')->insert([
            'description' => 'Bedrijfsmanagment',
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('field_of_studies')->insert([
            'description' => 'Agro-en biotechnologie',
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('field_of_studies')->insert([
            'description' => 'Bouw',
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'administrator',
            'firstname' => 'admin',
            'email' => 'admin1@mail.com',
            'email_verified_at' => new Carbon('2022-01-23 11:53:20'),
            'password' => Hash::make('Azerty123'),
            'role_id' => 1,
            'field_of_study_id' => 1,
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Coppens',
            'firstname' => 'Jasper',
            'email' => 'JasperCoppens@mail.com',
            'password' => Hash::make('Azerty123'),
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'role_id' => 2,
            'field_of_study_id' => 1,
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Berkein',
            'firstname' => 'Kobe',
            'email' => 'KobeBerkein@mail.com',
            'password' => Hash::make('Azerty123'),
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'role_id' => 2,
            'field_of_study_id' => 1,
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Huyghe',
            'firstname' => 'Nathan',
            'email' => 'NathanHuyghe@mail.com',
            'password' => Hash::make('Azerty123'),
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'role_id' => 2,
            'field_of_study_id' => 2,
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Goossens',
            'firstname' => 'Sander',
            'email' => 'SanderGoosens@mail.com',
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'password' => Hash::make('Azerty123'),
            'role_id' => 3,
            'company_id' => 2,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Pichai',
            'firstname' => 'Sundar',
            'email' => 'SundarPichai@mail.com',
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'password' => Hash::make('Azerty123'),
            'role_id' => 3,
            'company_id' => 3,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'doukeris',
            'firstname' => 'Michel',
            'email' => 'MichelDoukeris@mail.com',
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'password' => Hash::make('Azerty123'),
            'role_id' => 3,
            'company_id' => 4,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Demeester',
            'firstname' => 'Peter',
            'email' => 'PeterDemeester@mail.com',
            'password' => Hash::make('Azerty123'),
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'role_id' => 4,
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Verbeeck',
            'firstname' => 'Katja',
            'email' => 'KatjaVerbeeck@mail.com',
            'password' => Hash::make('Azerty123'),
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'role_id' => 4,
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Maervoet',
            'firstname' => 'Joris',
            'email' => 'JorisMaervoet@mail.com',
            'password' => Hash::make('Azerty123'),
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'role_id' => 4,
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('users')->insert([
            'name' => 'Vlaeminck',
            'firstname' => 'Wout',
            'email' => 'WoutVlaeminck@mail.com',
            'password' => Hash::make('Azerty123'),
            'email_verified_at' =>  new Carbon('2022-01-23 11:53:20'),
            'role_id' => 2,
            'field_of_study_id' => 2,
            'company_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 1 description',
            'name' =>'Backend',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 2 description',
            'name' =>'Frontend',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 3 description',
            'name' =>'Algemeen',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 4 description',
            'name' =>'Infrastructuur',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 5 description',
            'name' =>'Programmeren',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 6 description',
            'name' =>'Bedrijfsbeheer',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 7 description',
            'name' =>'Internationaal managment',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 8 description',
            'name' =>'Agro labo',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 9 description',
            'name' =>'Biotechnologie',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 10 description',
            'name' =>'Engels',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 11 description',
            'name' =>'Structuur',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('categories')->insert([
            'description' => 'category 12 description',
            'name' =>'Veiligheid',
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        $arrCat = array(1, 2, 3, 4, 5, 10);

        foreach ($arrCat as $cat) {
            DB::table('category_field_of_study')->insert([
                'category_id' => $cat,
                'field_of_study_id' => 1
            ]);
        }

        $arrCat = array(3, 6, 7, 10);

        foreach ($arrCat as $cat) {
            DB::table('category_field_of_study')->insert([
                'category_id' => $cat,
                'field_of_study_id' => 2
            ]);
        }

        $arrCat = array(3,8,9,12);

        foreach ($arrCat as $cat) {
            DB::table('category_field_of_study')->insert([
                'category_id' => $cat,
                'field_of_study_id' => 3
            ]);
        }

        $arrCat = array(3, 10, 11, 12);

        foreach ($arrCat as $cat) {
            DB::table('category_field_of_study')->insert([
                'category_id' => $cat,
                'field_of_study_id' => 4
            ]);
        }

        DB::table('internships')->insert([
            'student_id' => 2,
            'teacher_id' => 8,
            'mentor_id' => 5,
            'company_id' => 2,
            'feedback_count' => 10,
        ]);

        DB::table('internships')->insert([
            'student_id' => 3,
            'teacher_id' => 9,
            'mentor_id' => 6,
            'company_id' => 3,
            'feedback_count' => 25,
        ]);

        DB::table('internships')->insert([
            'student_id' => 4,
            'teacher_id' => 9,
            'mentor_id' => 7,
            'company_id' => 4,
            'feedback_count' => 0,
        ]);

        DB::table('internships')->insert([
            'student_id' => 11,
            'feedback_count' => 0,
        ]);

        // tasks not finished internship 1
        DB::table('tasks')->insert([
            'description' => 'Maak alle nodige models aan in de laravel backend.',
            'difficulty' => 'medium',
            'category_id' => 1,
            'title' => 'Aanmaken models',
            'deadline' => Carbon::createFromFormat('d/m/Y', '12/06/2022'),
            'requested_feedback' => 1,
            'internship_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('tasks')->insert([
            'description' => 'Maak alle nodige migrations aan in de laravel backend.',
            'difficulty' => 'easy',
            'category_id' => 1,
            'title' => 'aanmaken migrations',
            'deadline' => Carbon::createFromFormat('d/m/Y', '13/06/2022'),
            'requested_feedback' => 1,
            'internship_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        DB::table('tasks')->insert([
            'description' => 'description task 4',
            'difficulty' => 'medium',
            'category_id' => 2,
            'title' => 'Maak een login view',
            'deadline' => Carbon::createFromFormat('d/m/Y', '14/06/2022'),
            'requested_feedback' => 0,
            'feedback' => "De styling is niet in lijn met de design files.",
            'internship_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
        ]);

        // tasks finished internship 1
        DB::table('tasks')->insert([
            'description' => 'Zet een laravel backend op',
            'difficulty' => 'medium',
            'category_id' => 1,
            'title' => 'Opzetten Laravel backend',
            'deadline' => Carbon::createFromFormat('d/m/Y', '03/06/2022'),
            'requested_feedback' => 0,
            'internship_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
            'stopped_at' => new Carbon('2022-06-01 11:53:20')
        ]);

        DB::table('tasks')->insert([
            'description' => 'Zet een reactjs frontend op',
            'difficulty' => 'medium',
            'category_id' => 2,
            'title' => 'Opzetten ReactJS backend',
            'deadline' => Carbon::createFromFormat('d/m/Y', '03/06/2022'),
            'requested_feedback' => 0,
            'internship_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
            'stopped_at' => new Carbon('2022-06-01 11:53:20')
        ]);

        DB::table('tasks')->insert([
            'description' => 'description task 6',
            'difficulty' => 'hard',
            'category_id' => 4,
            'title' => 'ontwerp een databankschema',
            'deadline' => Carbon::createFromFormat('d/m/Y', '03/06/2022'),
            'requested_feedback' => 0,
            'internship_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
            'stopped_at' => new Carbon('2022-06-02 11:53:20')
        ]);

        DB::table('tasks')->insert([
            'description' => 'description task 6',
            'difficulty' => 'medium',
            'category_id' => 1,
            'title' => 'Programmeer api routes',
            'deadline' => Carbon::createFromFormat('d/m/Y', '06/06/2022'),
            'requested_feedback' => 0,
            'internship_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
            'stopped_at' => new Carbon('2022-06-03 11:53:20')
        ]);

        DB::table('tasks')->insert([
            'description' => 'description task 6',
            'difficulty' => 'hard',
            'category_id' => 4,
            'title' => 'Plaats de databank online',
            'deadline' => Carbon::createFromFormat('d/m/Y', '10/06/2022'),
            'requested_feedback' => 0,
            'internship_id' => 1,
            'created_at' =>  new Carbon('2022-01-23 11:53:20'),
            'updated_at' =>  new Carbon('2022-01-23 11:53:20'),
            'stopped_at' => new Carbon('2022-06-05 11:53:20')
        ]);

        DB::table('chat_rooms')->insert([
            'name' => 'chat.1.2',
            'user_1' => 1,
            'user_2' => 2
        ]);

        DB::table('chat_rooms')->insert([
            'name' => 'chat.3.5',
            'user_1' => 3,
            'user_2' => 5
        ]);
    }
}
