import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 constructor(private snack:MatSnackBar,private loginService:LoginService){}
  loginDetails ={
    username:'',
    password:''
  }
  onLogin(){
    console.log("Loggin in")
    if(this.loginDetails.username.trim()=='' || this.loginDetails.username==null){
      this.snack.open("Username is required !!","",{
        duration:3000
      });
      return;
    }
    if(this.loginDetails.password.trim()=='' || this.loginDetails.password==null){
      this.snack.open("Password is required !!","",{
        duration:3000
      });
      return;
    }
    //request server to generate token
    this.loginService.generateToken(this.loginDetails).subscribe(
      (res:any)=>{
        console.log(res)
      },
      (err:any)=>{
        console.log(err)
      }
    )

  }
}
