<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'banner_image',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
