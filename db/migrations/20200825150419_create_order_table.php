<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateOrderTable extends AbstractMigration
{
    private $tableName = 'orders';


    public function up(): void 
    {
        $table = $this->table($this->tableName, ['signed' => false, 'collation' => 'utf8mb4_general_ci' ]);

        $table
            ->addColumn('name',   'string',   [ 'limit' => 100,   'null' => false  ])
            ->addColumn('phone',   'string',   [ 'limit' => 32,   'null' => false  ])
            ->addColumn('address', 'string',   [ 'limit' => 150,   'null' => false  ])
            ->addColumn('instructions', 'string',   [ 'limit' => 250,   'null' => false  ])
            ->addColumn('products', 'string', [ 'limit' => 1500, 'signed'=> false, 'null' => false ])
            ->addColumn('updated_at','timestamp',[ 'default' => 'CURRENT_TIMESTAMP' ])
            ->addColumn('created_at','timestamp',[ 'default' => 'CURRENT_TIMESTAMP' ])
            ->save();
            
    }

    public function down(): void
    {
        $this->table($this->tableName)->drop()->save();
    }
}
