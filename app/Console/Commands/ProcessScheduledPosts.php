<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\PublishScheduledPosts;

class ProcessScheduledPosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    // protected $signature = 'app:process-scheduled-posts';
    protected $signature = 'posts:process';
    /**
     * The console command description.
     *
     * @var string
     */
    // protected $description = 'Command description';
    protected $description = 'Publish scheduled posts that are due';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        PublishScheduledPosts::dispatch();
        $this->info('A job has been submitted to process scheduled posts.');
    }
}
