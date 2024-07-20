<?php

namespace App\Http\Controllers\Fields;

use App\Http\Controllers\Controller;
use App\Models\Field;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShowFieldController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $fields = Field::get();

        return Inertia::render('Fields/Show', compact('fields'));
    }
}
