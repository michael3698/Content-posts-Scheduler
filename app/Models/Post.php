<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;


    protected $table = 'posts';


    protected $fillable = [
        'title',
        'content',
        'image_url',
        'status',
        'scheduled_time'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function platforms() {
        return $this->belongsToMany(Platform::class, 'post_platforms')
                    ->withPivot('platform_status')
                    ->withTimestamps();
    }
}
