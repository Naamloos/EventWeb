<?php

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
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('role_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->foreignId('permission_id')->constrained()->onDelete('cascade');
        });

        Schema::create('user_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
        });

        // Gets used to display events
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Name of the event
            $table->string('slug'); // URL-friendly name of the event
            $table->string('description'); // Short description of the event
            $table->longText('about'); // Description of the event
            $table->longText('image'); // URL (can be b64) to the image of the event

            $table->dateTime('starts_at'); // Start date and time of the event
            $table->dateTime('ends_at'); // End date and time of the event

            $table->string('location'); // Location of the event

            $table->string('ticket_price'); // Price of a ticket
            $table->string('ticket_url'); // URL to buy tickets

            $table->boolean('published'); // Whether to show this event at all
            $table->boolean('tickets_available'); // Whether tickets are available yet
            $table->timestamps();
        });

        // Gets used to display social media links
        Schema::create('socials', function (Blueprint $table) {
            $table->id();
            $table->integer('order')->default(0); // Order in which to display the social media platforms
            $table->string('name'); // Name of the social media platform
            $table->string('url'); // URL to the social media profile
            $table->string('icon'); // Font Awesome icon class
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // Unique key to identify the setting
            $table->string('value'); // Value of the setting
        });

        Schema::create('landing_pages', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Title of the landing page
            $table->longText('content'); // Content of the landing page
            $table->longText('banner_image'); // URL (can be b64) to the banner image of the landing page
            $table->boolean('active'); // Whether this landing page is active (only one is active at a time)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_permissions');
        Schema::dropIfExists('user_roles');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('events');
        Schema::dropIfExists('socials');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('landing_pages');
    }
};
