import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm = new FormGroup({
  email: new FormControl("",[Validators.required , Validators.email]),
  password: new FormControl("",[Validators.required , Validators.minLength(8)])
})
get email(){ return this.loginForm.get('email')}
get password(){ return this.loginForm.get('password')}

get loginData(){return this.loginForm.controls}
isSubmitted= false
errorMsg:any=null
  constructor(private global:GlobalService, private router: Router) { }

  ngOnInit(): void {
  }
  handleSubmit(){
    this.isSubmitted=true
    console.log(this.loginForm)
    if(this.loginForm.valid){
      this.global.login(this.loginForm.value).subscribe(res=>{
        console.log(res)
        if(res.error) {this.errorMsg= res.error}
        if(res.token){
          localStorage.setItem("token", res.token)
          this.global.isLogin = true
          this.router.navigate([""])
        }
      },(err)=>{
        console.log(err)
      },()=>{

      })
    }
  }
}
