<?php

namespace App\Http\Controllers;

use App\Fav;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class FavController extends Controller
{
    
    public function All(Request $request)
    {
        //
        $data = $request->all();
        $id = $data['user_id'];
        $collection = User::where('id',$id)->with('fav.item')->first();
        $collection = $collection->toArray();
        $tem = array();
        $newData = array();
        foreach ($collection["fav"] as $key => $value) {
           $tem[] = $value["item"];
        }

        foreach ($tem as $key) {
            $key["photo"] = Storage::url($key['photo']);
            $newData[] = $key;
        }

        return response()->json($newData, 200);
    }

    //create new entry

    public function Add(Request $request)
    {
        if ($fav = Fav::create($request->all())) {
             return response()->json($fav, 200);
        }
    }

   //fetch all favs for a user
    public function get(Request $request)
    {
        $data = $request->all();
        $id = $data['user_id'];
        $collection = Fav::where('user_id',$id)->get();
        return response()->json($collection, 200);
    }

    public function DeleteFav(Request $request){
        if (Fav::where('user_id',$request->user_id)->where('item_id',$request->item_id)->delete()) {
           return response()->json($request->item_id, 200);
        }
    }

    public function DeleteAllFav(Request $request)
    {
        if (Fav::where('user_id',$request->user_id)->delete()) {
            return response()->json(["message"=>"deleted!!"], 200);
         }
    }
  
}
