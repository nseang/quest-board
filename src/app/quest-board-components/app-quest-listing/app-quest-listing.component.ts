import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  //TODO Refactor this
  @Input() rotation: string = ''
  @Input() title: string = ''
  @Input() description: string = ''
  @Input() requester: string = ''
  @Input() questRank: string = ''
  @Input() adventurers: any[] = [];
  @Input() adventurersNeeded!: number;
  @Output() questClicked = new EventEmitter();

  displayRank: string| undefined;
  accepted: string = "";

  constructor() { }

  ngOnInit(): void {
    this.displayRank = questRanks.find(rank => rank.code === this.questRank)?.value;
    this.displayAcceptedCount();
  }

  displayAcceptedCount() {
    if(this.adventurers && this.adventurersNeeded > 1) {
      this.accepted = `${this.adventurers.length}/${this.adventurersNeeded}`
    }
  }

  openDialog() {
    this.questClicked.emit();
  }

}
