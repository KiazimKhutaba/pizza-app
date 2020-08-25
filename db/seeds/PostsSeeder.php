<?php


use Phinx\Seed\AbstractSeed;

class PostsSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * https://book.cakephp.org/phinx/0/en/seeding.html
     */
    public function run()
    {
        // $faker = Faker\Factory::create();
        // $data = [];

        // for ($i = 0; $i < 50; $i++) {
        //     $data[] = [
        //         'category_id'   => $faker->randomElement([1, 2, 3, 4, 5]),
        //         'section_id'    => $faker->randomElement([1, 2, 3, 4, 5]),
        //         'image'         => sprintf("https://source.unsplash.com/750x300/?%s", $faker->randomElement(['sky', 'football', 'auto', 'ball', 'flower', 'cacke', 'food'])),
        //         'url'           => $faker->regexify('\w{10}-\w{7,10}-\d{3}'),
        //         'title'         => $faker->sentence(6, false),
        //         'author'        => $faker->name,
        //         'exerpt'        => $faker->sentence(36),
        //         'content'       => $faker->text(1678),
        //         'created_at'    => $faker->dateTimeBetween('-30 days', 'now')->format('Y-m-d H:i:s'),
        //         'updated_at'    => $faker->dateTimeBetween('-10 days', 'now')->format('Y-m-d H:i:s')
        //     ];
        // }

        // $this->table('posts')->insert($data)->saveData();
    }
}
