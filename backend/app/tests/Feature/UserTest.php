<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function test_api_health()
    {
        $response = $this->get('/api/');

        $response->assertStatus(200);
    }

/*
    public function test_permission()
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['view-user']
        );
    }*/

    public function test_add_new_user() {
        $response = $this->postJSON('api/user/register', [
            "name"=> "atal",
            "firstname"=> "ab",
            "email"=> "atal@gmail.com",
            "password"=> "Azerty123",
            "role_id" => 2,
            "field_of_study_id" => 1,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                "name"=> "atal",
                "firstname"=> "ab",
                "email"=> "atal@gmail.com",
                "field_of_study_id" => 1,
                "id" => 11,
            ]);
    }

    public function test_add_user_with_missing_field() {
        $response = $this->postJSON('api/user/register', [
            "name"=> "atal",
            "email"=> "atal@gmail.com",
            "password"=> "Azerty123"
        ]);

        $response->assertStatus(422);
    }
/*
    public function test_add_existing_user() {
        $response = $this->postJSON('api/register', [
            "name"=> "atal",
            "firstname"=> "ab",
            "email"=> "atal@gmail.com",
            "password"=> "Azerty123",
            "company_id" => "1",
            "field_of_study_id" => "1",
        ]);

        $response->assertStatus(422);
    }*/

    public function test_content_mismatch() {
        $response = $this->postJSON('api/user/register', [
            "name"=> 555,
            "firstname"=> "Eden",
            "email"=> "hazard@gmail.com",
            "password"=> "Azerty123",
            "company_id" => "1",
            "field_of_study_id" => "1",
        ]);

        $response->assertStatus(422);
    }

    public function test_selected_company_is_invalid() {
        $response = $this->postJSON('api/user/register', [
            "name"=> "Hazard",
            "firstname"=> "Eden",
            "email"=> "hazard@gmail.com",
            "password"=> "Azerty123",
            "company_id" => "10",
            "field_of_study_id" => "1",
        ]);

        $response->assertStatus(422);
    }

    public function test_requestToGetTheStudentsOfMentorWithId5() {
        $response = $this->get('api/mentor/5/students');

        $response
            ->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
            $json->has(2)
                ->first(fn ($json) =>
                $json->where('student.id', 2)
                    ->where('student.name', 'student 1')
                    ->where('student.email', 'student1@mail.com')
                    ->where('student.role_id', 2)
                    ->where('student.field_of_study_id', 1)
                    ->etc()
                )
            );
    }

    public function test_requestToGetTheStudentsOfMentorWithId10() {
        $response = $this->get('api/mentor/10/students');

        $response->assertStatus(422);
    }

    public function test_requestBadges_student() {
        $response = $this->get('api/user/4/badges');

        $response
            ->assertStatus(200)
            ->assertJson([
                "Prettyplease" => 0,
                "Taskmaster" => 0,
                "Earlybird" => 0,
                "JackOfAllTrades" => 0
            ]);
    }

    public function test_requestBadges_user_500() {
        $response = $this->get('api/user/500/badges');

        $response->assertStatus(404);
    }

    public function test_requestBadges_role_teacher() {
        $response = $this->get('api/user/7/badges');

        $response->assertStatus(204);
    }

    public function test_requestStats_student() {
        $today = time();
        $start = strtotime("2022-02-23");
        $diff = intval(($today - $start) / (60 * 60 * 24));
        $response = $this->get('api/user/2/stats/'. strval($diff));

        $response
            ->assertStatus(200)
            ->assertJson([
                "2022-02-17" => 0,
                "2022-02-18" => 1,
                "2022-02-19" => 1,
                "2022-02-20" => 0,
                "2022-02-21" => 0,
                "2022-02-22" => 1,
                "2022-02-23" => 0
            ]);
    }

    public function test_requestStats_role_teacher() {
        $response = $this->get('api/user/7/stats/0');

        $response->assertStatus(200)
        ->assertJson([
            "2022-06-03" => 0,
            "2022-06-04" => 0,
            "2022-06-05" => 0,
            "2022-06-06" => 0,
            "2022-06-07" => 0,
            "2022-06-08" => 0,
            "2022-06-09" => 0
        ]);
    }

    public function test_requestStats_user_500() {
        $response = $this->get('api/user/500/stats/0');

        $response->assertStatus(404);
    }
}
