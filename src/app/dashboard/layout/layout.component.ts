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
      sessionStorage.setItem('language' , 'ar')
    } else {
      sessionStorage.setItem('language' , 'en')
    }
    window.location.reload()
  }

  logout() {
    this.router.navigate(['/auth'])
    sessionStorage.removeItem('token')
  }
}
