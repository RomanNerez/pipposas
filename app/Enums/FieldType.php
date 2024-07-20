<?php

namespace App\Enums;

enum FieldType: string {
    case STRING = 'string';
    case SELECT = 'select';
    case MULTISELECT = 'multiselect';
    case DATE = 'date';
}
