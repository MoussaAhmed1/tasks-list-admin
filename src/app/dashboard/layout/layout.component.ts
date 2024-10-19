import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  lang:any = "en"
  constructor( private router:Router,public translate:TranslateService) {
    this.lang = localStorage.getItem('language')
  }

  ngOnInit(): void {
  }

  changeLanguage() {
    if(this.translate.currentLang == "en") {
      this.translate.use('ar')
      localStorage.setItem('language' , 'ar');
    } else {
      this.translate.use('en')
      localStorage.setItem('language' , 'en');
    }
    window.location.reload()
  }

  logout() {
    sessionStorage.removeItem('token')
    this.router.navigate(['/auth'])
  }
}
