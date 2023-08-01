import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quest } from './models/quest';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firebase } from 'firebaseui-angular';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestReceptionistService {
  headerToken!: string;
  currentUser = {
    uid: '',
    email: ''
  }
  currentBoard = "defaultBoard";
  private _questSource = new BehaviorSubject<string>('defaultBoard')
  questItem$ = this._questSource.asObservable();
  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) { }

  signOut() {
    return this.afAuth.signOut().then(() => {
      window.alert('Logged Out!');
      this.currentUser = {
        uid: '',
        email: ''
      }
    })
  }

  getQuestBoards() {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/QuestBoards.json`;
    return this.http.get<any>(url);
  }

  getQuests() {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/${this.currentBoard}.json`;
    return this.http.get<any>(url);
  }

  postQuest(questDetails: Quest) {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/${this.currentBoard}.json?auth=${this.headerToken}`;
    return this.http.post<any>(url, questDetails)
  }

  removeQuest(questID: string) {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/${this.currentBoard}/${questID}.json`
    return this.http.delete<any>(url);
  }

  acceptQuest(questID: string, questDetails: Quest) {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/${this.currentBoard}/${questID}.json?auth=${this.headerToken}`;
    return this.http.put<any>(url, questDetails);
  }

  getTokenHeader() {
    return firebase.auth().currentUser?.getIdToken().then(token => {
      this.headerToken = token;
    });
  }

  setCurrentBoard(chosenBoard: string) {
    this.currentBoard = chosenBoard;
    this._questSource.next(chosenBoard);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  //Prototyping
  setUserData(uid?: string) {
    this.currentUser.uid = uid ? uid : firebase.auth().currentUser?.uid as string;
    this.currentUser.email = firebase.auth().currentUser?.email as string;
  }
}
