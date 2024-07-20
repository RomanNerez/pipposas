<?php

namespace App\Http\Controllers\Fields;

use App\Http\Controllers\Controller;
use App\Models\Field;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateFieldController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $entities = Field::getExistsEntities();

        return Inertia::render('Fields/Edit', compact('entities'));
    }
}
