import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
constructor(
  @Inject(MAT_DIALOG_DATA) public data: {title:string},
  private dialog: MatDialogRef<ConfirmComponent>,
  public translate: TranslateService
){}

close(){
  this.dialog.close();
}

confirm(){
  this.dialog.close(true);
}
}
