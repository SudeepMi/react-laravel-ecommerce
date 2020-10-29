<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Auth::routes();

Route::post('/admin/additems','Admin\ItemController@create');
Route::get('/admin/getitems','Admin\ItemController@getAll');
Route::post('/admin/deleteitems','Admin\ItemController@delete');
Route::post('/admin/edititems','Admin\ItemController@update');
Route::post('/admin/addcat','Admin\ItemController@AddCat');
Route::get('/admin/getcats','Admin\ItemController@getCats');
Route::post('/addfav','FavController@Add');
Route::post('/getfav','FavController@get');
Route::post('/getallfav','FavController@All');
Route::post('/delfav','FavController@DeleteFav');
Route::post('/delallfav','FavController@DeleteAllFav');








