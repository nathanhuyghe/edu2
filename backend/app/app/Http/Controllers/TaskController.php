<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskCollection;
use App\Models\Category;
use App\Models\FieldOfStudy;
use App\Models\Task;
use App\Models\Internship;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Events\feedback;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response|int
     */
    public function index()
    {
        //De gates werken wel!
//        Gate::authorize('is-admin');
        $id = Auth::user()->id;
        $role_id = Auth::user()->role_id;

        if($role_id === 4)  $internships = Internship::where("teacher_id", "=", $id)->get();
        elseif($role_id === 3)  $internships = Internship::where("mentor_id", "=", $id)->get();
        elseif($role_id === 2)  $internships = Internship::where("student_id", "=", $id)->get();

        $taskArray = [];
        foreach($internships as $internship) {
            array_push($taskArray, $internship->tasks->toArray());
        }

        $taskArray = array_merge(...$taskArray);

        return response($taskArray, 200)
            ->header('Content-Type', 'application/json');
    }

    public function getAllTasks($id) {
        $user = User::findOrFail($id);
 
        if($user->role_id === 4)  $internships = Internship::where("teacher_id", "=", $id)->get();
        elseif($user->role_id === 3)  $internships = Internship::where("mentor_id", "=", $id)->get();
        elseif($user->role_id === 2)  $internships = Internship::where("student_id", "=", $id)->get();

        $taskArray = [];
        foreach($internships as $internship) {
            array_push($taskArray, $internship->tasks->toArray());
        }

        $taskArray = array_merge(...$taskArray);

        return response($taskArray, 200)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'internship_id'=> ['required', 'integer', Rule::exists(Internship::class, 'id')],
            'title'=>'required',
            'description'=>'required',
            'difficulty' => 'required',
            'category_id' => [Rule::when(!$request->category_name, ['required', 'integer'], [])],
            'category_name' => ['nullable', 'string']
        ]);

        if ($request->category_name) {
            $newCategory = self::createNewCategory($request);

            return Task::create([
                'description' => $request->description,
                'difficulty' => $request->difficulty,
                'category_id' => $newCategory->id,
                'title' => $request->title,
                'internship_id' => $request->internship_id,
                'deadline' => $request->deadline
            ]);
        }

        return Task::create($request->all());
    }

    private function createNewCategory($request) {
        $internship = Internship::findOrFail($request->internship_id);
        $fieldOfStudy = $internship->student->field_of_study;
        $newCategory = $fieldOfStudy->category()->create([
            'description' => '',
            'name' => $request->category_name
        ]);

        return $newCategory;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::with('category')
        ->with('internship')
        ->with('internship.company')
        ->findOrFail($id);

        return response($task, 200)
           ->header('Content-Type', 'application/json');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        if($task->feedback != $request->feedback) {
            $task->requested_feedback = 0;
            self::generateAndSendNotificationToStudentByTask($task);
            $task->save();
        }

        $task->update($request->all());

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Task::destroy($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function requestFeedback($id) {
        $task = Task::findOrFail($id);
        $task->requested_feedback = 1;
        $task->internship->increment("feedback_count");

        self::generateAndSendNotificationToTeachersAndMentorsByTask($task);

        $task->save();

        return response()->noContent();
    }

    private function generateAndSendNotificationToTeachersAndMentorsByTask($task) {
        $idList = self::getTeachersAndMentorsOfInternshipByInternshipId($task->internship['id']);
        $message =  $task->internship->student["name"] . " requested feedback for task " . $task['title'];
        self::sendNotifications($idList, $message);
    }

    private function generateAndSendNotificationToStudentByTask($task) {
        $idList = $task->internship->student["id"];
        $message =  "You have received new feedback for task " . $task['title'];
        self::sendNotifications($idList, $message);
    }

    private function getTeachersAndMentorsOfInternshipByInternshipId($internshipId) {
        $idList[] = Internship::findOrFail($internshipId)->teacher['id'];
        array_push($idList, Internship::findOrFail($internshipId)->mentor['id']);

        return $idList;
    }

    private function sendNotifications($idList, $notificationContent) {
        if (is_array($idList)) {
            foreach ($idList as $id){
                broadcast(new feedback($notificationContent, $id));
            }
        }else {
            broadcast(new feedback($notificationContent, $idList));
        }
    }

    public function taskFinished($id)
    {
        $task = Task::findOrFail($id);

        $task->stopped_at = Carbon::now()->setTimezone('Europe/Brussels');
        $task->save();

        return response()->noContent();
    }

    public function getCategories(int $studentId)
    {
        $categories = User::with("field_of_study.category")->findOrFail($studentId);

        return response($categories, 200)
            ->header('Content-Type', 'application/json');
    }
}
