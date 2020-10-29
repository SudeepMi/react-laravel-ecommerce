<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fav extends Model
{
    //

    protected $fillable = ['user_id','item_id'];

    protected $table = 'fav';

    public function item()
    {
        return $this->hasOne('App\Item', 'id','item_id');
    }
}
