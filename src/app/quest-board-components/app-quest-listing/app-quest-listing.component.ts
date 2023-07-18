import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Output() questClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  openDialog() {
    this.questClicked.emit();
  }

}
