<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
            ROLES:
            - SuperAdmin (alle permissions, kan niet beheerd worden door gewone admins)
            - Admin (kan alle permissions beheren, behalve SuperAdmin)
            - Editor (kan posts en pages beheren)
        */

        $this->createRole('SuperAdmin');
        $this->createRole('Admin');
        $this->createRole('Editor');

        /*
            PERMISSIONS:
            - * (alle permissions)
            - roles (kan rollen beheren)
            - permissions (kan permissions beheren)
            - events (kan events beheren)
            - landing_pages (kan landing pages beheren)
            - socials (kan socials beheren)
            - settings (kan settings beheren)
        */

        $this->createPermission('*'); // kan niet beheerd worden door anderen
        $this->createPermission('roles');
        $this->createPermission('permissions');
        $this->createPermission('events');
        $this->createPermission('landing_pages');
        $this->createPermission('socials');
        $this->createPermission('settings');

        // Attach permissions to roles
        $this->attachPermissionToRole('SuperAdmin', '*');

        $this->attachPermissionToRole('Admin', 'roles');
        $this->attachPermissionToRole('Admin', 'permissions');
        $this->attachPermissionToRole('Admin', 'events');
        $this->attachPermissionToRole('Admin', 'landing_pages');
        $this->attachPermissionToRole('Admin', 'socials');
        $this->attachPermissionToRole('Admin', 'settings');

        $this->attachPermissionToRole('Editor', 'events');
        $this->attachPermissionToRole('Editor', 'landing_pages');
        $this->attachPermissionToRole('Editor', 'socials');

        // create rudimentary superadmin user
        $superAdmin = Role::where('name', 'SuperAdmin')->first();
        $superAdmin->users()->create([
            'name' => 'SuperAdmin',
            'email' => 'ryandejonge@outlook.com',
            'password' => bcrypt('password')
        ]);
    }

    private function createRole(string $name): void
    {
        if(Role::where('name', $name)->exists()) {
            return;
        }

        // Create role
        $role = Role::create([
            'name' => $name
        ]);

        // Attach permissions
        $permissions = Permission::all();
        $role->permissions()->attach($permissions);
    }

    private function createPermission(string $name): void
    {
        if(Permission::where('name', $name)->exists()) {
            return;
        }

        Permission::create([
            'name' => $name
        ]);
    }

    private function attachPermissionToRole(string $role, string $permission): void
    {
        $role = Role::where('name', $role)->first();
        $permission = Permission::where('name', $permission)->first();

        $role->permissions()->attach($permission);
    }
}
