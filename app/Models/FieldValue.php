<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FieldValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'field_id',
        'entity_id',
        'entity_title',
        'value'
    ];
}