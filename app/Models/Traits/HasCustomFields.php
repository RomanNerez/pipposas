<?php

namespace App\Models\Traits;

use App\Enums\FieldType;
use App\Models\Field;
use App\Models\FieldValue;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

trait HasCustomFields
{
    protected static function bootHasCustomFields(): void
    {
        static::deleted(function (Model $model) {
            static::clearCustomFieldValues($model->id);
        });
    }

    static public function getEntityTitle(): string
    {
        return (new \ReflectionClass(static::class))->getShortName();
    }

    static public function getCustomFields(): Collection
    {
        return Field::whereJsonContains('entities', static::getEntityTitle())->get();
    }

    static public function getCustomFieldsRules(): array
    {
        $customFields = static::getCustomFields();

        return $customFields->reduce(function ($acc, Field $field) {
            $isRequired = $field->is_required ? 'required' : 'nullable';
            $type = $field->type !== FieldType::MULTISELECT->value ? 'string' : 'array';

            $acc[$field->key] = [$isRequired, $type];

            return $acc;
        }, []);
    }

    static public function clearCustomFieldValues(int $id): void
    {
        $entityTitle = static::getEntityTitle();

        FieldValue::where('entity_id', $id)
            ->where('entity_title', $entityTitle)
            ->delete();
    }

    public function updateCustomFields(array $data): void
    {
        $customFields = static::getCustomFields();

        static::clearCustomFieldValues($this->id);

        foreach ($customFields as $customField) {
            $value = $data[$customField->key] ?? null;

            FieldValue::insert([
                'field_id' => $customField->id,
                'entity_id' => $this->id,
                'entity_title' => static::getEntityTitle(),
                'value' => is_string($value) ? $value : json_encode($value),
            ]);
        }
    }

    public function scopeWithCustomFields($query): void
    {
        $customFields = static::getCustomFields();
        $entityTitle = static::getEntityTitle();
        $table = $this->getTable();

        foreach ($customFields as $customField) {
            $query->addSelect([
                $customField->key => FieldValue::query()
                    ->select('value')
                    ->whereColumn('field_values.entity_id', '=', "{$table}.id")
                    ->where('field_values.field_id', '=', $customField->id)
                    ->where('field_values.entity_title', '=', $entityTitle)
            ]);
        }
    }
}
