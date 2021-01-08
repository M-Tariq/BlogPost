import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(http: HttpClient) { }

  // getData(): Observable<users> {
  //   return this.http.get<>('api/api-data.json')
// }
  getAllUser(){

  }
  getMessages(sender: String, receiver: String){
    
  }
  signin(email, password){
    
  }
}
