<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'key',
        'type',
        'is_required',
        'entities',
    ];

    protected $with = [
        'options'
    ];

    protected function casts(): array
    {
        return [
            'is_required' => 'boolean',
            'entities' => 'array',
        ];
    }

    public function options()
    {
        return $this->hasMany(FieldOption::class);
    }

    static public function getExistsEntities(): array
    {
        return [
            Project::getEntityTitle(),
        ];
    }
}
