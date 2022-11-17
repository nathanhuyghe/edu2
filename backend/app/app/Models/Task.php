<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    use HasFactory;

    protected $fillable = ['description', 'difficulty', 'category_id', 'title', 'stopped_at', 'deadline', 'feedback', 'requested_feedback', 'internship_id',];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function internship(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Internship::class);
    }
}
