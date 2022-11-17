<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('is-admin', function ($user){
//           return $user->role_id === 1;
            return $user->hasAnyRole('admin');
        });

        Gate::define('is-student', function ($user){
            return $user->hasAnyRole('student');
        });

        Gate::define('is-mentor', function ($user){
            return $user->hasAnyRole('mentor');
        });

        Gate::define('is-teacher', function ($user){
            return $user->hasAnyRole('teacher');
        });
    }
}
