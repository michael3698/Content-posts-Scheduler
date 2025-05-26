<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $validator = validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['user'=>$user ,'token' => $user->createToken('token')->plainTextToken], 201);
    }



    public function login(Request $request)
    {
        $validator = validator::make($request->all(),[
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ], 200);
    }



    public function profile(Request $request)
    {
        return response()->json($request->user());
    }



    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

}
