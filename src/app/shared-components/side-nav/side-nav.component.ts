import { Component, Input, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { QuestBoards } from 'src/app/models/questBoards';
import { QuestReceptionistService } from 'src/app/quest-receptionist.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  navMode: MatDrawerMode = "over"
  menuBars = faBars
  availableBoards!: QuestBoards[];

  constructor(
    private questService: QuestReceptionistService
  ) {}

  ngOnInit(): void {
    this.getQuestBoards();
  }

  getQuestBoards() {
    let questBoards
    this.questService.getQuestBoards().subscribe(data => {
      questBoards = Object.entries(data).map((e) => ({board: e[1], boardID: e[0]}));
      this.availableBoards = questBoards.map((boards: {boardID: string; board: any}) => ({
        code: boards.board.code,
        value: boards.board.value
      }))
    })
  };

  setCurrentBoard(board: string){
    this.questService.setCurrentBoard(board);
  }

}
