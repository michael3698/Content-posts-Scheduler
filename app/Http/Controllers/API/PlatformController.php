<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Platform;


class PlatformController extends Controller
{
    
    public function index()
    {
        return response()->json(Platform::all());
    }



    public function toggle(Request $request)
    {
        $request->validate([
            'platform_id' => 'required|exists:platforms,id',
        ]);

        $platform = Platform::find($request->platform_id);
        $platform->active = !$platform->active;
        $platform->save();

        return response()->json([
            'message' => 'Platform status updated.',
            'platform' => $platform,
        ]);
    }



}
