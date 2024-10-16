import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  constructor(
    private dialog: MatDialogRef<ConfirmationComponent>,
    private MatDialog:MatDialog
  ) { }
  close() {
  this.dialog.close();
}
confirm() {
  this.MatDialog.closeAll();
}

}
