<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatRoom extends Model
{
    use HasFactory;

    public function messages() {
        return $this->hasMany(ChatMessage::class);
    }

    public function user_1(): BelongsTo{
        return $this->belongsTo(User::class, 'user_1');
    }

    public function user_2(): BelongsTo{
        return $this->belongsTo(User::class, 'user_2');
    }
}
