import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isBefore } from 'date-fns';
import { Quest } from 'src/app/models/quest';

const questRanks = [
  {code: "D" , value: "D"},
  {code: "C" , value: "C"},
  {code: "B" , value: "B"},
  {code: "A" , value: "A"},
  {code: "S" , value: "S"},
  {code: "unknown" , value: "?"},
]

@Component({
  selector: 'app-quest-listing',
  templateUrl: './app-quest-listing.component.html',
  styleUrls: ['./app-quest-listing.component.scss']
})
export class AppQuestListingComponent implements OnInit {
  @Input() quest!: Quest;
  @Output() questClicked = new EventEmitter();

  displayRank: string| undefined;
  accepted: string = "";
  isExpired: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.displayRank = questRanks.find(rank => rank.code === this.quest.questRank)?.value;
    this.displayAcceptedCount();
    this.checkExpiration();
  }

  displayAcceptedCount() {
    if(this.quest.adventurer && this.quest.adventurersNeeded && this.quest.adventurersNeeded > 1) {
      this.accepted = `${this.quest.adventurer.length}/${this.quest.adventurersNeeded}`
    }
  }

  checkExpiration() {
    if(this.quest.deadline && isBefore(Date.parse(this.quest.deadline as string), new Date)) {
      this.isExpired = true;
    }
  }

  openDialog() {
    this.questClicked.emit();
  }

}
