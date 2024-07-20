<?php

use App\Enums\FieldType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $cases = FieldType::cases();

        $types = array_map(fn($case) => $case->value, $cases);

        Schema::create('fields', function (Blueprint $table) use ($types) {
            $table->id();
            $table->string('name');
            $table->string('key');
            $table->enum('type', $types);
            $table->boolean('is_required', false);
            $table->json('entities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fields');
    }
};
