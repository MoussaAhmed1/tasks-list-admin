import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  lang:any = "en"
  constructor( private router:Router) { 
   
  }

  ngOnInit(): void {
  }

  changeLanguage() {
    if(this.lang == "en") {
      localStorage.setItem('language' , 'ar')
    } else {
      localStorage.setItem('language' , 'en')
    }
    window.location.reload()
  }

  logout() {
    this.router.navigate(['/auth'])
    localStorage.removeItem('token')
  }
}
