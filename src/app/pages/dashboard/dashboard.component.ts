import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

constructor(private postService: PostService, private router: Router) {}

ngOnInit(): void {
  this.loadPosts();
}


posts: any[] = [];
statusFilter: string = '';
dateFilter: string = '';

loadPosts() {
  this.postService.getPosts({
    status: this.statusFilter,
    date: this.dateFilter
  }).subscribe((res: any) => {
    this.posts = res;
  });
}

onFilterChange() {
  this.loadPosts();
}

goToPosts(): void {
  this.router.navigate(['/posts']);
}

platformsetting(){
    this.router.navigate(['/settings']);
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
