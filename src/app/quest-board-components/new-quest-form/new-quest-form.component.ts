import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewQuestData } from '../app-quest-board/app-quest-board.component';

@Component({
  selector: 'app-new-quest-form',
  templateUrl: './new-quest-form.component.html',
  styleUrls: ['./new-quest-form.component.scss'],
})
export class NewQuestFormComponent {

  constructor(
    public dialogRef: MatDialogRef<NewQuestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewQuestData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
