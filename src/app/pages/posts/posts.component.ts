import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  editingPost: any = null;

  posts: any[] = [];
  statusFilter: string = '';
  dateFilter: string = '';
  
  title = '';
  content = '';
  image_url = '';
  scheduled_time: any = '';
  platform_ids: number[] = [];
  platforms: any[] = [];
  status: any;

  showCreate: boolean = false;
  
  constructor(private postService: PostService ,private router: Router) {}

  ngOnInit(): void {
    this.loadPlatforms();
    this.loadPosts();
  }

  loadPlatforms() {
    this.postService.getPlatforms().subscribe((res: any) => {
      this.platforms = res;
    });
  }

  
  createPost() {
    const data = {
      title: this.title,
      content: this.content,
      image_url: this.image_url,
      scheduled_time: this.status === 'scheduled' ? this.scheduled_time : null,
      platform_ids: this.platform_ids,
      status: this.status
    };

    this.postService.createPost(data).subscribe({
      next: () =>{ alert('Post created successfully'),
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/posts']);
      });
      },
      error: (err) => {
        if (err.status === 422) {
          const errors = err.error.errors;
          console.log(errors);
          alert(Object.values(errors).flat().join('\n'));
        } else if (err.status === 401) {
          alert('Unauthorized. Please log in again.');
        } else {
          alert('An error occurred while creating the post.');
        }
      }
    });
  }


  onPlatformToggle(id: number, event: any) {
    if (event.target.checked) {
      this.platform_ids.push(id);
    } else {
      this.platform_ids = this.platform_ids.filter(pid => pid !== id);
    }
  }



  startEdit(post: any) {
    this.editingPost = { ...post };  
    this.platform_ids = post.platforms.map((p: any) => p.id);  
  }


  submitEdit() {
    if (!this.editingPost || !this.editingPost.id) {
      alert('No post selected for update.');
      return;
    }

    const data = {
      title: this.editingPost.title,
      content: this.editingPost.content,
      image_url: this.editingPost.image_url,
      scheduled_time: this.editingPost.scheduled_time ,
      platform_ids: this.platform_ids,
      status: this.editingPost.status,
    };

    this.postService.updatePost(this.editingPost.id, data).subscribe({
      next: () => {
        alert('Post updated successfully');
        this.editingPost = null; 
        this.platform_ids = [];
        this.loadPosts(); 
      },
      error: (err) => {
        if (err.status === 422) {
          const errors = err.error.errors;
          console.log(errors);
          alert(Object.values(errors).flat().join('\n'));
        } else if (err.status === 401) {
          alert('Unauthorized. Please log in again.');
        } else {
          alert('An error occurred while updating the post.');
        }
      }
    });
  }


  cancelEdit() {
    this.editingPost = null;
    this.platform_ids = [];
  }


  delete(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(() => {
        alert('Post deleted');
      this.loadPosts();
      });
    }
  }



  loadPosts() {
    this.postService.getPosts({
      status: this.statusFilter,
      date: this.dateFilter
    }).subscribe((res: any) => {
      this.posts = res;
    });
  }


  goTodashboard(){
      this.router.navigate(['/dashboard']);
  }

  logout() {
    this.postService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        this.router.navigate(['/login']); 
      },
      error: () => {
        alert('Logout failed');
      }
    });
  }


}
