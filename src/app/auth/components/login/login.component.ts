import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private router:Router
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
    this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.toastr.success('Login Successfull');
        this.router.navigate(['tasks']);
      },

      error:(err:{error:{message:string}})=>{
        this.toastr.error(err?.error?.message)
      }
    })
  }
}
