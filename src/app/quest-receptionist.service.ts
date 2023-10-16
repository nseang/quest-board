import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quest } from './models/quest';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firebase } from 'firebaseui-angular';
import { BehaviorSubject } from 'rxjs';
import { Adventurer } from './models/adventurer';


@Injectable({
  providedIn: 'root'
})
export class QuestReceptionistService {
  headerToken!: string;
  currentUser: Adventurer = {
    uid: '',
    email: '',
    name: ''
  }
  currentBoard = "defaultBoard";
  // currentBoard = "testBoard";
  private _questSource = new BehaviorSubject<string>('defaultBoard');
  questItem$ = this._questSource.asObservable();
  private _currentUser = new BehaviorSubject<Adventurer>({uid: this.currentUser.uid, email: this.currentUser.email, name: this.currentUser.name});
  currentUser$ = this._questSource.asObservable();
  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) { }

  signOut() {
    return this.afAuth.signOut().then(() => {
      window.alert('Logged Out!');
      this.currentUser = {
        uid: '',
        email: '',
        name: ''
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

  setAdventurerData(adventurerName: string) {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/Users/${this.currentUser.uid}.json?auth=${this.headerToken}`;
    let adventurerData = {
      name: adventurerName
    }
    return this.http.put<any>(url, adventurerData);
  }

  getAdventurerData() {
    let url = `https://quest-board-b16-default-rtdb.firebaseio.com/Users/${this.currentUser.uid}.json?auth=${this.headerToken}`;
    this.http.get(url).subscribe((data: any) => {
      this.currentUser.name = data.name;
      this._currentUser.next(this.currentUser);
    })
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

  getCurrentBoard() {
    return this.currentBoard;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async setUserData(uid?: string) {
    await this.getTokenHeader();
    this.currentUser.uid = uid ? uid : firebase.auth().currentUser?.uid as string;
    this.currentUser.email = firebase.auth().currentUser?.email as string;
    this.getAdventurerData();
  }
}
