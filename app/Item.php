<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    //
    protected $fillable = ['name','author','publisher','description','photo','category'];

    public function category()
    {
        return $this->hasOne('App\Category', 'id','category');
    }
    
}
