<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Http\Requests\Projects\StoreProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class StoreProjectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreProjectRequest $request)
    {
        $project = Project::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title
        ]);

        $project->updateCustomFields($request->input());

        return redirect(route('projects.show'));
    }
}
