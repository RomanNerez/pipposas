<?php

namespace App\Http\Requests\Fields;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\FieldType;

class StoreFieldRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isSelectType = fn() => in_array($this->type, [FieldType::SELECT, FieldType::MULTISELECT]);

        $rules = [
            'name' => 'required|string|max:255',
            'type' => ['required', 'string', Rule::enum(FieldType::class)],
            'options' => [
                Rule::requiredIf($isSelectType),
                'array',
                function ($attribute, $value, $fail) use ($isSelectType) {
                    if ($isSelectType() && empty($value)) {
                        $fail('The options field is required when type is select or multiselect.');
                    }
                },
            ],
            'options.*.value' => [
                Rule::requiredIf($isSelectType),
                function ($attribute, $value, $fail) use ($isSelectType) {
                    if ($isSelectType() && !$value) {
                        $fail('You haven\'t filled in all the options.');
                    }
                },
                'max:255'
            ],
            'is_required' => 'nullable|boolean',
            'entities' => 'nullable|array'
        ];

        return $rules;
    }
}
