<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateUserTable extends AbstractMigration
{
    private $tableName = 'users';


    public function up(): void 
    {
        $table = $this->table($this->tableName, ['signed' => false]);

        $table
            ->addColumn('name', 'string', [ 'limit' => 50, 'null' => false ])
            ->addColumn('email', 'string', ['limit' => 50, 'null' => false])
            ->addColumn('password', 'string', ['limit' => 255, 'null' => false])
            ->addColumn('createdAt', 'datetime', ['null' => false])
            ->save();
            
    }

    public function down(): void
    {
        $this->table($this->tableName)->drop()->save();
    }
}
