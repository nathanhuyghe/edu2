<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\FieldOfStudy;
use App\Models\Internship;
use App\Models\Task;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Http\Resources\UserCollection;
use phpDocumentor\Reflection\Types\Nullable;

class UserController extends Controller
{
    public function requestStats(int $userId, int $days)
    {
        $internshipId = null;
        $user = User::findOrFail($userId);
        $role = $user->role_id;

        if ($role !== 2) {
            return response('', 204);
        }

        $internships = Internship::where("student_id", "=", $user->id)->get();

        foreach ($internships as $internship)
        {
            $internshipId = $internship->id;
        }

        if($internshipId == null) return response('Geen internships gevonden', 404);

        $tasks = Task::where("internship_id", "=", $internshipId)->get();
        if(!$tasks) return response('Geen taken gevonden', 401);

        $weekStats = array(
            date('Y-m-d', strtotime('-'.strval($days + 6).' day')) => 0,
            date('Y-m-d', strtotime('-'.strval($days + 5).' day')) => 0,
            date('Y-m-d', strtotime('-'.strval($days + 4).' day')) => 0,
            date('Y-m-d', strtotime('-'.strval($days + 3).' day')) => 0,
            date('Y-m-d', strtotime('-'.strval($days + 2).' day')) => 0,
            date('Y-m-d', strtotime('-'.strval($days + 1).' day')) => 0,
            date('Y-m-d', strtotime('-'.strval($days).' day')) => 0,
        );

        foreach ($tasks as $task)
        {
            $doneTime = $task->stopped_at;
            if(!is_null($doneTime))
            {
                if (array_key_exists(date('Y-m-d', strtotime($doneTime)), $weekStats))
                {
                    $weekStats[date('Y-m-d', strtotime($doneTime))] = $weekStats[date('Y-m-d', strtotime($doneTime))] + 1;
                }
            }
        }
        return response($weekStats);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $users = new UserCollection(User::All());
        return response($users, 200)
            ->header('Content-Type', 'application/json');
    }

    public function requestBadges(User $user)
    {
        if($user->role['role'] !== 'student') return response()->noContent();

        $tasks = self::getTasksByUser($user);

        if(!$tasks) return response('Geen taken gevonden',401);

        $badges = self::calculateAndBuildBadgesArray($tasks, $user);

        return response($badges, 200);
    }

    private function calculateAndBuildBadgesArray($tasks, $user) {
        $valueTaskmaster = $this->requestBadgeTaskmaster($tasks);
        $valuePrettyPlease = $this->requestBadgePrettyPlease($user);
        $valueEarlyBird = $this->requestBadgeEarlyBird($tasks);
        $valueJackOfAllTrades = $this->requestBadgeJackOfAllTrades($tasks, $user);

        return self::buildBadgesArray($valuePrettyPlease, $valueTaskmaster, $valueEarlyBird, $valueJackOfAllTrades);
    }

    private function getTasksByUser($user) {
        return $user->internship->tasks;
    }

    private function buildBadgesArray($valuePrettyPlease, $valueTaskmaster, $valueEarlyBird, $valueJackOfAllTrades) {
        return array(
            'Prettyplease' => $valuePrettyPlease,
            'Taskmaster' => $valueTaskmaster,
            'Earlybird' => $valueEarlyBird,
            'JackOfAllTrades' => $valueJackOfAllTrades,
        );
    }

    public function requestBadgeTaskmaster($tasks)
    {
        $count = 0;

        foreach ($tasks as $task)
        {
            if (isset($task->stopped_at) && !is_null($task->stopped_at)) {
                $count = $count + 1;
            }
        }

        if($count < 6) return (0);
        elseif($count < 11) return (1);
        elseif($count < 21) return (2);
        else return (3);
    }

    public function requestBadgePrettyPlease($user)
    {
        $count = $user->internship['feedback_count'];

        if($count < 11) return (0);
        elseif($count < 16) return (1);
        elseif($count < 26) return (2);
        else return (3);
    }

    public function requestBadgeEarlyBird($tasks)
    {
        $count = 0;

        foreach ($tasks as $task)
        {
            $stopped_time = strtotime($task->stopped_at);
            $deadline_time = strtotime($task->deadline);
            if ($deadline_time - $stopped_time < 3) {
                $count = $count + 1;
            }
        }

        if($count < 3) return (0);
        elseif($count < 6) return (1);
        elseif($count < 11) return (2);
        else return (3);
    }

    public function requestBadgeJackOfAllTrades($tasks, $user)
    {
        $categoryIdArray = self::buildCategoryIdArray($user);
        $count = self::findLowestAmountOfTasksCompletedPerCategory($categoryIdArray, $tasks);

        if($count < 2) return (0);
        elseif($count < 6) return (1);
        elseif($count < 11) return (2);
        else return (3);
    }

    private function findLowestAmountOfTasksCompletedPerCategory($categoryIdArray, $tasks) {
        foreach ($tasks as $task)
        {
            if (isset($task->stopped_at) && !is_null($task->stopped_at)) {
                $replacement = array($task->category_id => $categoryIdArray[$task->category_id] + 1);
                $categoryIdArray = array_replace($categoryIdArray, $replacement);
            }
        }

        $count = 100;
        foreach ($categoryIdArray as $key => $value) {
            if($value < $count){
                $count = $value;
            }
        }

        return $count;
    }

    private function buildCategoryIdArray($user) {
        $categories = $user->field_of_study->category;
        $categoryIdArray = array();

        foreach ($categories as $category){
            $id = $category->id;
            $categoryIdArray[$id] = 0;
        }

        return $categoryIdArray;
    }

    /**
     * Store a newly created resource in storage.
     *
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = null;
        if($request->role_id === 2 ) $user = self::createAndLoginStudent($request);
        elseif ($request->role_id === 3 ) $user = self::createAndLoginMentor($request);
        elseif ($request->role_id === 4 ) $user = self::createAndLoginTeacher($request);

        if($user === null)  return response('', 422);

        event(new Registered($user));

        return $user;
    }

    private function createAndLoginStudent(Request $request) {
        Auth::login($user = User::create([
            'name' => $request->name,
            'firstname' => $request->firstname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'field_of_study_id' => $request->field_of_study_id,
        ]));

        $user->internship()->create([
            'student_id' => $user['id']
        ]);

        return $user;
    }

    private function createAndLoginMentor(Request $request) {
        if(!$request->company_name) return null;

        Auth::login($user = User::create([
            'name' => $request->name,
            'firstname' => $request->firstname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]));

        $company = Company::create([
            'name' => $request->company_name,
        ]);

        $user->company_id = $company['id'];
        $user->save();

        return $user;
    }

    private function createAndLoginTeacher(Request $request) {
        Auth::login($user = User::create([
            'name' => $request->name,
            'firstname' => $request->firstname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]));

        return $user;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::with('internship.mentor')
            ->with('internship.teacher')
            ->findOrFail($id);

        return response($user, 200)
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
        $user = User::findOrFail($id);
        $user->update($request->all());

         return response($user, 200)
           ->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return User::destroy($id);
    }

    //Todo de mentor gate gebruiken
    public function requestMentorStudents(User $user)
    {
        if($user->role['id'] !== 3) return response("User is no mentor.",422);
        $mentorStudents = Internship::with('student')
            ->with('company')
            ->where('mentor_id', $user->id)
            ->get()
            ->makeHidden(['student_id', 'teacher_id', 'mentor_id', 'company_id', 'created_at', 'updated_at', 'feedback_count']);

        return response($mentorStudents, 200)
            ->header('Content-Type', 'application/json');
    }
}
