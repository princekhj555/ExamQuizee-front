import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //generate token
  public generateToken(loginDetails:any){
    return this.http.post(`${baseUrl}/generate-token`,loginDetails);
  }

  //loginUser: set token to localstorage 
  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }
  //islogin: user is logged in or not
  public isLoggedIn(){
    return ((localStorage.getItem("token") == null) ||
             (localStorage.getItem("token") == undefined )|| 
             (localStorage.getItem("token") =="") 
             )?false:true;
  }
  //Logout: remove token from storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //getToken to get token from localStorage
  public getToken(){
    return localStorage.getItem("token");
  }
  //setUser: set UserDetails
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify( user));
  }
  public getUser(){
    let user=localStorage.getItem('user');
    if(user!=null){
      return JSON.parse(user);
    }else{
      this.logout();
      return null;
    }
  }
  //to get the userRole
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
