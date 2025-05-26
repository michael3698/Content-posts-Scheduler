import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

private apiUrl = 'http://localhost:8000/api';



  constructor(private http: HttpClient) {}

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getPlatforms() {
    return this.http.get(`${this.apiUrl}/platforms`, this.getAuthHeaders());
  }

  createPost(data: any) {
    const token = this.getToken(); 
    if (!token) {
      throw new Error('No access token found.');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/posts`, data, { headers });
  }


  getPosts(filters: any = {}) {
    const token = this.getToken(); 
    if (!token) {
      throw new Error('No access token found.');
    }
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params: any = {};
    if (filters.status) params.status = filters.status;
    if (filters.date) params.date = filters.date;

    return this.http.get(`${this.apiUrl}/posts`, { headers, params });
  }


  updatePost(id: number, data: any) {
    const token = this.getToken(); 
    if (!token) {
      throw new Error('No access token found.');
    }
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/posts/${id}`, data, { headers});
  }


  deletePost(id: number) {
    const token = this.getToken(); 
    if (!token) {
      throw new Error('No access token found.');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/posts/${id}`,{ headers });
  }

  logout() {
    const token = this.getToken();
    if (!token) throw new Error('No token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }


  getUserPlatforms() {
  return this.http.get(`${this.apiUrl}/platforms`, this.getAuthHeaders());
  }

  togglePlatform(platformId: number) {
    return this.http.post(`${this.apiUrl}/platforms/toggle`, { platform_id: platformId }, this.getAuthHeaders());
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }
  


}