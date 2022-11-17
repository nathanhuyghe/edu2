<?php

use App\Http\Controllers\FieldOfStudyController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\UserTaskController;
use App\Mail\InviteMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return Response(200);
});
Route::post('user/register', [UserController::class, 'store']);
Route::get('/user/{id}/stats/{days}', [UserController::class, 'requestStats']);
Route::get('/user/{id}/tasks', [TaskController::class, 'getAllTasks']);
Route::patch('tasks/{id}/request-feedback', [TaskController::class, 'requestFeedback']);
Route::patch('tasks/{id}/finished', [TaskController::class, 'taskFinished']);
Route::get('users/{studentId}/categories', [TaskController::class, 'getCategories']);

// extra routes voor resourceControllers hierboven zetten
// Route::apiResource([
//     'tasks' => TaskController::class,
// ]);
//->middleware('auth:sanctum');

Route::post('/mails/{user}', [MailController::class, 'sendInviteMail']);
Route::patch('tasks/{id}/request-feedback', [TaskController::class, 'requestFeedback']);
Route::get('user/{user}/badges', [UserController::class, 'requestBadges']);
Route::get('field-of-studies', [FieldOfStudyController::class, 'getAllFieldOfStudies']);

// extra routes voor resourceControllers hierboven zetten
Route::apiResource('internships', InternshipController::class);
Route::apiResource('tasks', TaskController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('users.tasks', UserTaskController::class)->scoped([
    'task' => 'task:id'
]);
Route::get('mentor/{user}/students', [UserController::class, 'requestMentorStudents']);
