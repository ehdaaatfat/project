import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  pathUrl="http://localhost:3000/user"

  public isLogin : boolean =false
  public UserData: any
  constructor( private http: HttpClient) {}

  //https://jsonplaceholder.typicode.com/users
  getUsers():Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/users")
  }
  //https://jsonplaceholder.typicode.com/posts?_limit=10
  getproducts():Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/posts?_limit=10")
  }
  getSinglProduct( id : any):Observable<any>{
    const headers = new HttpHeaders()
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`, {headers: headers})
  }

  register(obj:any):Observable<any>{
    
    return this.http.post( `${this.pathUrl}/register`,obj)
  }
  login(obj:any):Observable<any>{
    return this.http.post( `${this.pathUrl}/login`,obj)
  }
  AuthMe(id: any):Observable<any>{
    
    return this.http.post( `${this.pathUrl}/all/${id}`, null)
  }
}
