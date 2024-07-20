<?php

namespace App\Http\Controllers\Fields;

use App\Http\Controllers\Controller;
use App\Models\Field;
use Illuminate\Http\Request;

class DeleteFieldController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Field $field)
    {
        $field->delete();

        return redirect(route('fields.show'));
    }
}
