<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;
use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertTrue;

class TaskTest extends TestCase
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

    public function test_get_task_with_id_1() {
        $response = $this->get('api/tasks/1');

        $response
            ->assertStatus(200)
            ->assertJson([
                'id' => 1,
                'deadline'=>  '2022-02-23',
                'difficulty'=> 'medium',
                'title'=> 'title task 1',
                'description'=> 'description task 1',
                'feedback' => null,
                'requested_feedback' => 1,
                'stopped_at'=> null,
                'internship_id'=> 1,
                'category_id'=> 1,
                'created_at'=> '2022-01-23T11:53:20.000000Z',
                'updated_at'=> '2022-01-23T11:53:20.000000Z'
            ]);;
    }

    public function test_get_task_with_non_existing_id() {
        $response = $this->get('api/tasks/-1');

        $response
            ->assertStatus(404);
    }

    public function test_post_new_task() {
        $response = $this->postJSON('api/tasks', [
            'deadline' =>  Carbon::createFromFormat('d/m/Y', '23/01/2022')->format('Y-m-d'),
            'difficulty' => 'medium',
            'title' => 'titel new task',
            'description' => 'description new task',
            'stopped_at'=> null,
            'requested_feedback' => 1,
            'internship_id'=> 1,
            'category_id' => 1,
            'user_id' => 1,
        ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                'deadline' =>  '2022-01-23',
                'difficulty' => 'medium',
                'title' => 'titel new task',
                'description' => 'description new task',
                'stopped_at'=> null,
                'requested_feedback' => 1,
                'internship_id'=> 1,
                'category_id' => 1,
            ]);
    }

    public function test_update_task() {
        $this->withoutExceptionHandling();

        $response = $this->patchJSON('api/tasks/1', [
            'feedback' => 'zeer goed gedaan',
        ]);

        $response
            ->assertStatus(204);
    }

    public function test_delete_task() {
        $response = $this->deleteJSON('api/tasks/1');

        $response
            ->assertStatus(200);
    }

    public function test_request_feedback_task_3() {
        $response = $this->patch('api/tasks/3/request-feedback');
        $response
            ->assertStatus(204);
    }

    public function test_request_feedback_task_100() {
        $response = $this->patch('api/tasks/100/request-feedback');
        $response
            ->assertStatus(404);
    }

    public function test_post_feedback() {
        $response = $this->putJson('api/tasks/3', [
            'feedback' => "updated feedback",
        ]);

        $task = Task::findOrFail(3);
        assertEquals($task->requested_feedback, 0);
        assertTrue($task->feedback === "updated feedback");

        $response
            ->assertStatus(204);
    }

    public function test_task_finished_request() {
        $response = $this->patch('api/tasks/3/finished');

        $response
            ->assertStatus(204);
    }



}
