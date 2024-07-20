<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PreviewProjectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, int $project): Response
    {
        $project = Project::withCustomFields()->findOrFail($project);
        $fields = Project::getCustomFields();

        return Inertia::render('Projects/Preview', compact('fields', 'project'));
    }
}
