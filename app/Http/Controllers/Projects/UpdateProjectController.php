<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Http\Requests\Projects\UpdateProjectRequest;
use App\Models\Project;

class UpdateProjectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateProjectRequest $request, Project $project)
    {
        $project->update([
            'user_id' => auth()->user()->id,
            'title' => $request->title
        ]);

        $project->updateCustomFields($request->input());

        return redirect(route('projects.show'));
    }
}
