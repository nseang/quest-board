import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quest } from 'src/app/models/quest';
import { QuestReceptionistService } from 'src/app/quest-receptionist.service';

@Component({
  selector: 'app-quest-details-modal',
  templateUrl: './quest-details-modal.component.html',
  styleUrls: ['./quest-details-modal.component.scss']
})
export class QuestDetailsModalComponent implements OnInit {
  adventurer: string | undefined;
  currentAdventurer: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<QuestDetailsModalComponent>,
    private questService: QuestReceptionistService,
    @Inject(MAT_DIALOG_DATA) public data: {questData: Quest},
  ) { }

  ngOnInit() {
    this.adventurer = this.data.questData.adventurer?.email?.split("@")[0];
    this.currentAdventurer = this.questService.getCurrentUser().uid;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onAcceptQuest(): void {
    this.data.questData.accepted = true;
    this.data.questData.adventurer = this.questService.getCurrentUser();
    this.dialogRef.close(this.data) 
  }

}
