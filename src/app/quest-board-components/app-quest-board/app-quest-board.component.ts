import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Quest } from 'src/app/models/quest';
import { QuestReceptionistService } from 'src/app/quest-receptionist.service';
import { NewQuestFormComponent } from '../new-quest-form/new-quest-form.component';
import { QuestDetailsModalComponent } from '../quest-details-modal/quest-details-modal.component';
import { Subscription } from 'rxjs';
import { UserFormComponent } from '../user-form/user-form.component';
import { Adventurer } from 'src/app/models/adventurer';

export interface NewQuestData {
  questName: string;
  questDescription: string;
  questGiver: string;
  questRank: string;
  adventurersNeeded?: number;
  deadline?: Date
}

@Component({
  selector: 'app-quest-board',
  templateUrl: './app-quest-board.component.html',
  styleUrls: ['./app-quest-board.component.scss']
})
export class AppQuestBoardComponent implements OnInit, OnDestroy {
  questList: any;
  questName!: string | null;
  questDescription!: string | null;
  questRank!: string |null;
  adventurersNeeded!: number | undefined;
  latestQuestID: string | undefined;
  currentUser: Adventurer | undefined;
  boardSubscription!: Subscription;
  adventurerSubscription!: Subscription;


  constructor(
    private questService: QuestReceptionistService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.boardSubscription = this.questService.questItem$.subscribe(board => {
      this.getQuests();
    })
    this.adventurerSubscription = this.questService.currentUser$.subscribe(adventurer => {
      this.currentUser = this.questService.getCurrentUser();
    })

  }

  ngOnDestroy() {
    this.boardSubscription.unsubscribe();
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
          adventurer: quests.quest.adventurer,
          adventurersNeeded: quests.quest.adventurersNeeded,
          datePosted: quests.quest.datePosted,
          deadline: quests.quest.deadline
        }))
        console.log(this.questList)
      },
      error: (e) => console.log(e)
    })
  }

  openNewQuestDialog(): void {
    const dialogRef = this.dialog.open(NewQuestFormComponent, {
      data: {questName: this.questName, questDescription: this.questDescription, questRank: this.questRank},
      width: '60%'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.questName = result.questName;
      this.questDescription = result.questDescription;
      this.questRank = result.questRank;
      this.adventurersNeeded = result.adventurersNeeded;
      if (this.questName && this.questDescription) {
        let newQuest: Quest = {
          title: this.questName,
          description: this.questDescription,
          requester: this.currentUser?.name ? this.currentUser.name : this.currentUser?.email?.split("@")[0],
          questRank: this.questRank,
          adventurersNeeded: this.adventurersNeeded,
          datePosted: new Date(),
          deadline: result.deadline
        }
        console.log('new quest',newQuest);
        this.postQuest(newQuest)
      }
    })
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {name: this.currentUser?.name},
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.name) {
        this.registerAdventurer(result.name);
      }
    })


  }

  //TODO create questData interface
  openQuestDialog(questData: Quest): void {
    const dialogRef = this.dialog.open(QuestDetailsModalComponent, {
      data: {questData}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result.questData.adventurer) {
        this.acceptQuest(result.questData.questID, result.questData);
      }
    })
  }

  async acceptQuest(questID: string, questDetails: Quest) {
    await this.questService.getTokenHeader();
    this.questService.acceptQuest(questID, questDetails).subscribe(data => {
      this.getQuests();
    })
  }

  removeQuest(questID: string) {
    this.questService.removeQuest(questID).subscribe(data => {
      this.getQuests();
    })
  }

  async registerAdventurer(name: string) {
    await this.questService.getTokenHeader();
    this.questService.setAdventurerData(name).subscribe(data => {
      this.questService.getAdventurerData();  
    });
  }

  
  async postQuest(quest: Quest) {
    await this.questService.getTokenHeader();
    this.questService.postQuest(quest).subscribe(data => {
      this.latestQuestID = data.id;
      this.questName = null;
      this.questDescription = null;

      this.getQuests();
      });
  }

  logOut() {
    this.questService.signOut();
  }

};



