<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AddItemRequest;
use App\Item;
use App\Category;
use Illuminate\Support\Facades\Storage;
class ItemController extends Controller
{
    //

    // public function __construct(){
    //    dd("here");
    // }

    public function create(AddItemRequest $request){

       $data = $request->all();
        $img = $data["photo"];
        $filename = $data['name'].date('y-m-d-h-m-s').'.jpeg';
       if($image_parts = explode(";base64,", $img)){
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $data["photo"] = $filename;
        $path = Storage::put($filename, $image_base64);
        if ($path) {
            if($item = Item::create($data)) {
                return response()->json(["status"=>true,"data"=>$item], 200);
            }
        }
    }
        return response()->json(["status"=>false,"message"=>"error uploading picture"], 500);
    }

    public function getAll(){   
        $items = Item::with('category')->inRandomOrder()->get();
        $data =  $items->toArray();
        $newData = [];
       
        foreach ($data as $key => $value) {
            if (isset($value["category"]['id'])) {
              $catid = $value["category"]['id'];
              $value["category_id"] = $catid;
            }
           $value["photo"] = Storage::url($value['photo']);
           $value["category"] = $value["category"]["cat_name"];
           $newData[] = $value;
        }
        return $newData;
        // dd($newData);
    }

    public function delete(Request $request){
        $dataBox = $request->all();
        $id = $dataBox["data"][0];
        if (Item::where("id",$id)->delete()) {
            return  response()->json(["message"=>"Item Deleted Successfully"], 201);
        }
        else{
            return response()->json(["message"=>"failed to delete item"], 500);
        }
       
    }

    public function AddCat(Request $request){
        $data = $request->all();
        if($item = Category::create($data)) {
            return response()->json(["status"=>true,"data"=>$item], 200);
        }

    }

    public function getCats(){
        $data = Category::all();
        return $data;
    }

    public function update(Request $request){
      
       $data = $request->all();
    //    dd($data);
       $img = $data["photo"];
       $id = $data['id'];
       $item = Item::where('id',$id)->first();

        if (!empty($img)) { 
            $filename = $data['name'].date('y-m-d-h-m-s').'.jpeg';
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $path = Storage::put($filename, $image_base64);
            $data["photo"] = $filename;
            $item->photo = $data['photo'];
        }
           $item->name = $data["name"];
           $item->author = $data["author"];
           $item->publisher = $data["publisher"];
           $item->description = $data["description"];
           $item->category = $data["category"];
          
           if($item->save()) {
               return response()->json(["status"=>true,"data"=>$this->getAll()], 200);
           }
            else{
                return response()->json(["message"=>"failed to update item"], 500);
            }
       
    }


}
