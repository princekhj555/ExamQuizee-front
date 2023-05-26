import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService:UserService,private snack:MatSnackBar){}
  public user={
    username:"",
    password:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:""

  }
  registerSubmit(){
    if(this.user.username=="" || this.user.username==null ||
        this.user.email==""||this.user.email==null||
        this.user.firstName==""||this.user.firstName==null||
        this.user.phone==""||this.user.phone==null||
        this.user.password==""||this.user.password==null
        ){
      this.snack.open("Please fill the required fields !!","",{
        duration:3000
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        Swal.fire("Success","User is registered","success");
      },
      (error)=>{
        console.log(error);
        this.snack.open(error.error,"",{
          duration:3000
        });
        //error
      }
      )
  }
}
