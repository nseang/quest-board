import { Component } from '@angular/core';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { QuestReceptionistService } from './quest-receptionist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quest-board';

  constructor(
    private questService: QuestReceptionistService,
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService
  ) {
    firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
   }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    // TODO
  }
    
  errorCallback(errorData: FirebaseUISignInFailure) {
    // TODO
  }
    
}
