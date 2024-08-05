<?php

namespace App\Console\Commands;

use App\Models\Invite;
use Illuminate\Console\Command;

class CreateInvite extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tanorave:invite {role}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a new invite key';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $key = bin2hex(random_bytes(16));

        $role = $this->argument('role');

        Invite::create([
            'key' => $key,
            'role_id' => $role,
        ]);

        $this->info("Invite key: $key");
    }
}
