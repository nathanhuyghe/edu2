<?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreateTasksTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('tasks', function (Blueprint $table) {
                $table->id();

                $table->date('deadline')->nullable();
                $table->string('difficulty')->nullable();
                $table->string('title');
                $table->string('description');
                $table->string('feedback')->nullable();
                $table->boolean('requested_feedback')->default(0);
                $table->dateTime('stopped_at')->nullable();

                $table->foreignId('internship_id')->references('id')->on('internships')->nullable();
                $table->foreignId('category_id')->references('id')->on('categories')->nullable();

                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::dropIfExists('tasks');
        }
    }
