<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CreateStudentTest extends TestCase
{
     use RefreshDatabase;
     use DatabaseMigrations;

     public function setUp(): void
     {
         parent::setUp();
         $this->artisan('db:seed');
     }

    public function test_a_teacher_can_render_newStudent_view()
    {
//        $this->withoutExceptionHandling();
        $user = User::factory()->create([
            'role_id' => 4,
        ]);

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->get(url('/admin-panel/new-student'));
        $response->assertOk();
        $response->assertViewIs('adminPanel.newStudent');
    }

    public function test_a_student_can_not_render_newStudent_view()
    {
        $user = User::factory()->create([
            'role_id' => 2,
        ]);

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->get(url('/admin-panel/new-student'));
        $response->assertStatus(403);
    }

    public function test_a_teacher_can_add_a_new_student()
    {
        $user = User::factory()->create([
            'role_id' => 4,
        ]);

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->post(url('/new-student'), [
                'name' => "newStudent",
                'firstname' => "one",
                'email' => "newstudent1@mail.com",
                'email_verified_at' => now(),
                'password' => 'password',
                'field_of_study_id' => 1,
                'company_id' => 1,
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect(url('/'));
    }

    public function test_a_new_student_cant_be_added_when_there_is_a_validation_error()
    {
        $user = User::factory()->create([
            'role_id' => 4,
        ]);

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->post(url('/new-student'), [
                'name' => "newStudent",
                'email' => "newstudent2@mail.com",
                'email_verified_at' => now(),
                'password' => 'password',
                'field_of_study_id' => 1,
                'company_id' => 1,
            ]);

        $response->assertSessionHasErrors('firstname');
    }

}
