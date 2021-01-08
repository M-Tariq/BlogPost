import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Auth from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  signin(auth: Auth) {

    return this.http.post(environment.SOCKET_ENDPOINT+"/auth/signin", auth).subscribe({
      next: data => {
        
        // return true;
        console.log(data);
      },
      error: error => {
        return false;
        // console.error('There was an error!', error);
      }
    });
  }


  signup(user) {
    this.http.post<any>(environment.SOCKET_ENDPOINT+"/auth/signin"+"/auth/signup", user)
    .subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {

        console.error('There was an error!', error);
      }
    })

  }

}
