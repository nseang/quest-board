import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quest } from './models/quest';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {firebase} from 'firebaseui-angular';



@Injectable({
  providedIn: 'root'
})
export class QuestReceptionistService {
  headerToken!: string;
  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) { }

  signOut() {
    return this.afAuth.signOut().then(() => {
      window.alert('Logged Out!');
    })
  }

  getQuests() {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/testQuests.json`;
    return this.http.get<any>(url);
  }

  postQuest(questDetails: Quest) {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/testQuests.json?auth=${this.headerToken}`;
    return this.http.post<any>(url, questDetails)
  }

  removeQuest(questID: string) {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/testQuests/${questID}.json`
    return this.http.delete<any>(url);
  }

  getTokenHeader() {
    return firebase.auth().currentUser?.getIdToken().then(token => {
      this.headerToken = token;
    });
  }
}
