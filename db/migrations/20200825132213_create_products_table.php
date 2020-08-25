<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateProductsTable extends AbstractMigration
{
    private $tableName = 'products';


    public function up(): void 
    {
        $table = $this->table($this->tableName, ['signed' => false, 'collation' => 'utf8mb4_general_ci' ]);

        $table
            ->addColumn('name',   'string',   [ 'limit' => 100,   'null' => false  ])
            ->addColumn('image',  'string',   [ 'limit' => 255,   'null' => false, 'default' => 'product-image-not-found.png' ])
            ->addColumn('desc',   'string',   [ 'limit' => 200,   'null' => false  ])
            ->addColumn('rating', 'integer',  [ 'signed'=> false, 'null' => false, 'default' => 0 ])
            ->addColumn('price',  'decimal',  [ 'signed' => false,'null' => false, 'precision' => 4, 'scale' => 2  ])
            ->addColumn('created','timestamp',[ 'default' => 'CURRENT_TIMESTAMP' ])
            ->save();
            
    }

    public function down(): void
    {
        $this->table($this->tableName)->drop()->save();
    }
}
