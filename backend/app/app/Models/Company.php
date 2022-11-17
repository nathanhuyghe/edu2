<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';
    use HasFactory;

    protected $fillable = ['name'];

    public function user(){
        return $this->hasOne(User::class, 'company_user');
    }

    public function field_of_study(){
        return $this->hasMany(FieldOfStudy::class);
    }

    public function internship(){
        return $this->hasMany(Internship::class);
    }
}
