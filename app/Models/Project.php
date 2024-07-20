<?php

namespace App\Models;

use App\Contracts\Fields\ICustomFields;
use App\Models\Traits\HasCustomFields;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model implements ICustomFields
{
    use HasFactory;
    use HasCustomFields;

    protected $fillable = [
        'user_id',
        'title'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
