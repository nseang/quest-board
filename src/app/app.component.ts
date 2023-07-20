import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { QuestReceptionistService } from './quest-receptionist.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'quest-board';

  constructor(
    private questService: QuestReceptionistService,
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService
  ) {
    firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
   }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this.questService.setUserData()
  }
    
  errorCallback(errorData: FirebaseUISignInFailure) {
    // TODO
  }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.questService.setUserData(uid)
      } else {

      }
    });
  }    
}
