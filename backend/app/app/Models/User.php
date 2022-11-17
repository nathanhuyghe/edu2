<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'first_name',
        'password',
        'firstname',
        'role_id',
        'company_id',
        'field_of_study_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function internship() {
        return $this->hasOne(Internship::class, 'student_id');
    }

    public function role(){
        return $this->belongsTo(Role::class);
    }

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function field_of_study(){
        return $this->belongsTo(FieldOfStudy::class);
    }

    public function teacher(){
        return $this->hasMany(Internship::class);
    }

    public function student(){
        return $this->hasMany(Internship::class);
    }

    public function mentor(){
        return $this->hasMany(Internship::class);
    }

    public function chatRoom(){
        return $this->hasMany(ChatRoom::class);
    }

    public function hasAnyRole($role)
    {
        return null !== $this->role()->where('role', $role)->first();
    }
}
