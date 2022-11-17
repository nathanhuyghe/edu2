<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FieldOfStudy extends Model
{
    protected $table = 'field_of_studies';
    use HasFactory;

    protected $fillable = ['description', 'company_id'];

    public function user(){
        return $this->hasMany(User::class);
    }

    public function category(){
        return $this->belongsToMany(Category::class, 'category_field_of_study');
    }

    public function company(){
        return $this->belongsTo(Company::class);
    }
}
