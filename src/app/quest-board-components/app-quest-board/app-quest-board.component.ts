import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Quest } from 'src/app/models/quest';
import { QuestReceptionistService } from 'src/app/quest-receptionist.service';
import { NewQuestFormComponent } from '../new-quest-form/new-quest-form.component';
import { QuestDetailsModalComponent } from '../quest-details-modal/quest-details-modal.component';

export interface NewQuestData {
  questName: string;
  questDescription: string;
  questGiver: string;
  questRank: string;
}

@Component({
  selector: 'app-quest-board',
  templateUrl: './app-quest-board.component.html',
  styleUrls: ['./app-quest-board.component.scss']
})
export class AppQuestBoardComponent implements OnInit {
  questList: any;
  questName!: string | null;
  questDescription!: string | null;
  questGiver!: string | null;
  questRank!: string |null;
  latestQuestID: string | undefined;

  constructor(
    private questService: QuestReceptionistService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getQuests();
  }

  async getQuests() {
    this.questService.getQuests().subscribe({
      next: (quests) => {
        console.log('unmapped quests', Object.entries(quests))
        this.questList = Object.entries(quests).map((e) => ({ quest: e[1], questID: e[0] } ));
        console.log('quest list',this.questList)
        this.questList = this.questList.map((quests: {questID: string; quest: any}) => ({
          title: quests.quest.title,
          description: quests.quest.description,
          requester: quests.quest.requester,
          rotation: Math.floor(Math.random() * 6) - 3 + "deg",
          questID: quests.questID,
          questRank: quests.quest.questRank,
          accepted: quests.quest.accepted,
          adventurer: quests.quest.adventurer
        }))
        console.log(this.questList)
      },
      error: (e) => console.log(e)
    })
  }

  openNewQuestDialog(): void {
    const dialogRef = this.dialog.open(NewQuestFormComponent, {
      data: {questName: this.questName, questDescription: this.questDescription, questGiver: this.questGiver, questRank: this.questRank},
      width: '60%'
    })
    
    dialogRef.afterClosed().subscribe(result => {
      this.questName = result.questName;
      this.questDescription = result.questDescription;
      this.questGiver = result.questGiver;
      this.questRank = result.questRank;
      if (this.questName && this.questGiver && this.questDescription) {
        let newQuest: Quest = {
          title: this.questName,
          description: this.questDescription,
          requester: this.questGiver,
          questRank: this.questRank
        }
        console.log(newQuest,'new quest')
        this.postQuest(newQuest)
      }
    })
  }

  //TODO create questData interface
  openQuestDialog(questData: Quest): void {
    const dialogRef = this.dialog.open(QuestDetailsModalComponent, {
      data: {questData}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result.questData.accepted) {
        this.acceptQuest(result.questData.questID, result.questData);
      }
    })
  }

  async acceptQuest(questID: string, questDetails: Quest) {
    await this.questService.getTokenHeader();
    this.questService.acceptQuest(questID, questDetails).subscribe(data => {
      console.log(data);
      this.getQuests();
    })
  }

  removeQuest(questID: string) {
    this.questService.removeQuest(questID).subscribe(data => {
      console.log(data);
      this.getQuests();
    })
  }

  
  async postQuest(quest: Quest) {
    await this.questService.getTokenHeader();
    this.questService.postQuest(quest).subscribe(data => {
      this.latestQuestID = data.id;
      this.questName = null;
      this.questDescription = null;
      this.questGiver = null;

      this.getQuests();
    });
  }

  logOut() {
    this.questService.signOut();
  }

};



