<?php

namespace App\Http\Controllers\Fields;

use App\Enums\FieldType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Fields\UpdateFieldRequest;
use App\Models\Field;
use Illuminate\Support\Str;

class UpdateFieldController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateFieldRequest $request, Field $field)
    {
        $field->update([
            'name' => $request->name,
            'key' => Str::slug($request->name),
            'type' => $request->type,
            'is_required' => $request->is_required,
            'entities' => $request->entities,
        ]);

        $field->options()->delete();

        if (in_array($request->type, [FieldType::SELECT->value, FieldType::MULTISELECT->value])) {
            $field->options()->createMany($request->options ?? []);
        }

        return redirect(route('fields.show'));
    }
}
