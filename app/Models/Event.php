<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'about',
        'image',
        'starts_at',
        'ends_at',
        'location',
        'ticket_price',
        'ticket_url',
        'published',
        'tickets_available',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'published' => 'boolean',
        'tickets_available' => 'boolean',
    ];
}
