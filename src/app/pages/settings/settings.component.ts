import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {


  platforms: any[] = [];

  constructor(private postService: PostService, private router:Router) {}

  ngOnInit(): void {
    this.loadUserPlatforms();
  }

  loadUserPlatforms() {
    this.postService.getUserPlatforms().subscribe((res: any) => {
      this.platforms = res;
    });
  }

  togglePlatform(id: number) {
    this.postService.togglePlatform(id).subscribe(() => {
      this.loadUserPlatforms();
    });
  }

  goTodashboard(){
      this.router.navigate(['/dashboard']);
  }
  
}
