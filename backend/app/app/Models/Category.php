<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    use HasFactory;

    protected $fillable = ['description', 'name'];

    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function fields_of_studies(){
        return $this->belongsToMany(FieldOfStudy::class, 'category_field_of_study');
    }
}
