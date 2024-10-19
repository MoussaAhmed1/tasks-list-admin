import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasks-list';
  lang:"ar"|"en" = "ar";
  constructor(public translate: TranslateService) {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'ar');
      this.lang = 'ar';
    }
    else{
      this.lang = localStorage.getItem('language') as "ar"||'en' ;
    }
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
  }
}
