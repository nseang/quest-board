import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quest } from 'src/app/models/quest';

@Component({
  selector: 'app-quest-details-modal',
  templateUrl: './quest-details-modal.component.html',
  styleUrls: ['./quest-details-modal.component.scss']
})
export class QuestDetailsModalComponent {

  constructor(
    public dialogRef: MatDialogRef<QuestDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {questData: Quest},
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  testConsole() {
    console.log('data',this.data)
  }

}
