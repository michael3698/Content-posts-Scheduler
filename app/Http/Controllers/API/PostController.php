<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Platform;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|url',
            'status' => 'required|in:scheduled,draft,published',
            'scheduled_time' => Rule::requiredIf(fn () => $request->status === 'scheduled'),
            'platform_ids' => 'required|array|min:1',
            'platform_ids.*' => 'exists:platforms,id',
        ]);

        if ($request->status === 'scheduled') {
                $scheduledDate = Carbon::parse($request->scheduled_time)->startOfDay();
                $scheduledEnd = Carbon::parse($request->scheduled_time)->endOfDay();

                $scheduledCount = auth()->user()->posts()
                    ->where('status', 'scheduled')
                    ->whereBetween('scheduled_time', [$scheduledDate, $scheduledEnd])
                    ->count();

                if ($scheduledCount >= 10) {
                    return response()->json([
                        'message' => 'You can only schedule up to 10 posts per day.'
                    ], 422);
                }
            }

        $post = auth()->user()->posts()->create($request->only(['title', 'content', 'image_url', 'scheduled_time', 'status']));

        $post->platforms()->attach($request->platform_ids);

        return response()->json($post->load('platforms'));
    }



    public function userPosts(Request $request)
    {
        $query = Post::where('user_id', auth()->id());

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('date')) {
            $query->whereDate('scheduled_time', $request->date);
        }

        return response()->json($query->with('platforms')->latest()->get());
    }




    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'string|max:255',
            'content' => 'string',
            'image_url' => 'nullable|url',
            'status' => 'required|in:scheduled,draft,published',
            'scheduled_time' => 'required',
        ]);

        $post->update($request->only(['title', 'content', 'image_url', 'scheduled_time', 'status']));

        if ($request->has('platform_ids')) {
            $post->platforms()->sync($request->platform_ids);
        }

        return response()->json($post->load('platforms'));
    }




    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }



}
