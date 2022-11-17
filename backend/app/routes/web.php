<?php

use App\Events\MyEvent;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminPanelController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Http\Request;
use App\Http\Controllers\ChatController;



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

    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/event', function () {
    event(new MyEvent('hello world'));
});


Route::get('/listen', function (){
    return view('listen');
});

//Route::get('/admin-panel/login', [LoginController::class, 'showLoginForm'])->name('login');
//Route::post('/admin-panel/login', [LoginController::class, 'login'])->name('login');


Route::prefix('/admin-panel/')->group(function(){
    Auth::routes();
});

Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return redirect('./admin-panel');
    });

//    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/admin-panel/ui', [AdminPanelController::class, 'testUi']);
    Route::get('/admin-panel/upload-teachers-by-csv', [AdminPanelController::class, 'showUploadByCsv']);
    Route::get('/admin-panel/upload-students-by-csv', [AdminPanelController::class, 'showUploadByCsv']);
    Route::post('/admin-panel/upload-teachers-by-csv', [AdminPanelController::class, 'postUploadByCsv']);
    Route::post('/admin-panel/upload-students-by-csv', [AdminPanelController::class, 'postUploadByCsv']);
    Route::get('/admin-panel', [AdminPanelController::class, 'showAdminPanel'])->name('home');

    Route::get('/admin-panel/new-student', [AdminPanelController::class, 'showNewStudentForm']);
    Route::post('/new-student', [AdminPanelController::class, 'addNewStudent']);

    Route::get('/admin-panel/new-teacher', [AdminPanelController::class, 'showNewTeacherForm']);
    Route::post('/new-teacher', [AdminPanelController::class, 'addNewTeacher']);
});


Route::post('/sanctum/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = $request->user()->load(['company','internship.teacher', 'internship.mentor']);

        return response($user, 200);
    }
    return response(['message' => 'The provided credentials do not match our records.'], 422);
});

Route::get('/santcumuser', function (Request $request){
    if(Auth::check()){
        return response(Auth::user(), 201);
    }
    else {
        return response(null, 401);
    }
});

Route::post('/sanctum/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    return response(['message' => 'The user has been logged out successfully'], 200);
});

    Route::get('/chat/room', [ChatController::class, 'getRoom']);
    Route::get('/chat/rooms', [ChatController::class, 'rooms']);
    Route::get('/chat/room/{id}/messages', [ChatController::class, 'messages']);
    Route::post('/chat/room/{id}/message/{userId}', [ChatController::class, 'newMessage']);
    Route::post('/chat/room', [ChatController::class, 'createRoom']);


//Route::middleware('auth:sanctum')->get('/chat/rooms', [ChatController::class, 'rooms']);
//Route::middleware('auth:sanctum')->get('/chat/room/{roomId}/messages', [ChatController::class, 'messages']);
//Route::middleware('auth:sanctum')->post('/chat/room/{roomId}/message', [ChatController::class, 'newMessage']);

