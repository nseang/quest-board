import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quest } from './models/quest';


@Injectable({
  providedIn: 'root'
})
export class QuestReceptionistService {

  constructor(private http: HttpClient) { }


  getQuests() {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/testQuests.json`;
    return this.http.get<any>(url);
  }

  postQuest(questDetails: Quest) {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/testQuests.json`;
    return this.http.post<any>(url, questDetails)
  }

  removeQuest(questID: string) {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/testQuests/${questID}.json`
    return this.http.delete<any>(url);
  }
}
