<?php

namespace PizzaApp\Models;


use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
    protected $table = 'orders';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'phone', 'address', 'instructions', 'products', 'created'
    ];

}