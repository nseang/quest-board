import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewQuestData } from '../app-quest-board/app-quest-board.component';
import { isAfter, isBefore } from 'date-fns'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-new-quest-form',
  templateUrl: './new-quest-form.component.html',
  styleUrls: ['./new-quest-form.component.scss'],
})
export class NewQuestFormComponent {

  valid: boolean = false;
  invalidDeadline: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewQuestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewQuestData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    if(event.value && isAfter(event.value, new Date)) {
      this.valid = true;
      this.invalidDeadline = false;
      this.checkValidation();
    } else {
      this.valid = false
      this.invalidDeadline = true;
    }
    if(event.value && isBefore(event.value, new Date)) {
      this.valid = false;
      this.invalidDeadline = true;
    } 
  }

  checkValidation() {
    if(this.data.questName && this.data.questDescription) {
      this.valid = true;
    } else {
      this.valid = false;
    }
    if(this.invalidDeadline) {
      this.valid = false;
    }
  }

}
