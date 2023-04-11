import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router){}
  loginDetails ={
    username:'',
    password:''
  }
  ngOnInit(){
    window.addEventListener("popstate", this.handleBackButton);
  }
  ngOnDestroy() {
    window.removeEventListener("popstate", this.handleBackButton);
  }
  onLogin(){
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

        //login using the token
        this.loginService.loginUser(res.token);
        //add current user to localstorage
        this.loginService.getCurrentUser().subscribe(
          (res:any)=>{
            this.loginService.setUser(res);
            console.log(res);
            //rediretc to admin user page  if role is Admin User:: Admin User
            //redirect to Normal user page is role is Normal user:: Normal User
            if(this.loginService.getUserRole()=='Admin User'){
              // window.location.href='/admin'
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            }
            else if(this.loginService.getUserRole()=='Normal User'){ 
              // window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard']);
              this.loginService.loginStatusSubject.next(true);
            }else{
              this.loginService.logout();
            }
          },(err:any)=>{
            console.log(err);
          }
        )

      },
      (err:any)=>{
        console.log(err);
        this.snack.open("Invalid Details, Please Try again with correct credentials !!","",{
          duration:3000
        });
      }
    )

  }

  // function to handle browser back button press
 handleBackButton() {
  if (!this.loginService.isLoggedIn()) {
    // redirect the user to the login page if not authenticated
    window.location.href = "/login";
  }
}

// add an event listener for the browser back button press
// window.addEventListener("popstate", handleBackButton);
}
