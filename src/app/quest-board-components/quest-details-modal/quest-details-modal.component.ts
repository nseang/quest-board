import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isBefore } from 'date-fns';
import { Quest } from 'src/app/models/quest';
import { QuestReceptionistService } from 'src/app/quest-receptionist.service';

@Component({
  selector: 'app-quest-details-modal',
  templateUrl: './quest-details-modal.component.html',
  styleUrls: ['./quest-details-modal.component.scss']
})
export class QuestDetailsModalComponent implements OnInit {
  adventurer: string = "";
  currentAdventurer: string | undefined;
  available: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<QuestDetailsModalComponent>,
    private questService: QuestReceptionistService,
    @Inject(MAT_DIALOG_DATA) public data: {questData: Quest},
  ) { }

  ngOnInit() {
    this.displayAdventurers();
    this.currentAdventurer = this.questService.getCurrentUser().uid;
    this.checkAvailablity();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onAcceptQuest(): void {
    if(!this.data.questData.adventurer) {
      this.data.questData.adventurer = [];
    }
    this.data.questData.adventurer?.push(this.questService.getCurrentUser());
    this.dialogRef.close(this.data) 
  }

  displayAdventurers() {
    this.data.questData.adventurer?.forEach(adventurer => {
      this.adventurer = `${this.adventurer} ${adventurer.email?.split("@")[0]} |`
    })
  }

  checkAvailablity() {
    if(this.data.questData.adventurersNeeded && this.data.questData.adventurer) {
      if(this.data.questData.adventurer.length >= this.data.questData.adventurersNeeded) {
        this.available = false;
        return;
      }
      if(this.currentAdventurer) {
        let accepted = this.data.questData.adventurer.find(adventurer => adventurer.uid === this.currentAdventurer)
        this.available = accepted ? false : true;
      }

    }

    if(!this.data.questData.adventurer && this.currentAdventurer) {
      this.available = true;
    }

    this.checkExpiration();

  }

  checkExpiration() {
    if(this.data.questData.deadline && isBefore(Date.parse(this.data.questData.deadline as string), new Date)) {
      this.available = false;
    }
  }

}
