<?php

namespace PizzaApp\Models;


use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    protected $table = 'products';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'image', 'desc', 'rating', 'price', 'created'
    ];

}