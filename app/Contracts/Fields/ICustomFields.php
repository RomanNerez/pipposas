<?php

namespace App\Contracts\Fields;

use Illuminate\Database\Eloquent\Collection;

interface ICustomFields
{
    static public function getEntityTitle(): string;

    static public function getCustomFields(): Collection;

    public function updateCustomFields(array $data): void;

    public function scopeWithCustomFields($query): void;

    static public function clearCustomFieldValues(int $id): void;
}
