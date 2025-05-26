<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Post;
use Carbon\Carbon;

class PublishScheduledPosts implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $now = Carbon::now();

        $posts = Post::where('status', 'scheduled')
            ->where('scheduled_time', '<=', $now)
            ->with('platforms')
            ->get();

        foreach ($posts as $post) {
            
            foreach ($post->platforms as $platform) {

                $post->platforms()->updateExistingPivot($platform->id, [
                    'platform_status' => 'published',
                ]);
            }

            
            $post->update(['status' => 'published']);
        }
    }
}
