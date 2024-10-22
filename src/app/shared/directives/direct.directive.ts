import { Directive, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appDirect]'
})
export class DirectDirective {

  constructor(private translate: TranslateService,private el: ElementRef) {
    this.el.nativeElement.style.direction = this.translate.currentLang == 'ar' ? 'rtl' : 'ltr';
   }

  
}
