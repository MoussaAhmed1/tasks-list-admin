import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      role:['admin']
    });
  }



  ngOnInit(): void {
    console.log(this.loginForm.status)
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login(){
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.toastr.success('Login Successfull');
        sessionStorage.setItem("token" , res.token);
        this.router.navigate(['tasks'],{queryParams:{role:this.loginForm.get('role')?.value,}});
      },

      error:(err:{error:{message:string}})=>{
        this.toastr.error(err?.error?.message)
      },
      complete:()=>{
        this.spinner.hide()
      }
    })
  }
}
