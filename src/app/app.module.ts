import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppQuestListingComponent } from './quest-board-components/app-quest-listing/app-quest-listing.component';
import { AppQuestBoardComponent } from './quest-board-components/app-quest-board/app-quest-board.component';
import { NewQuestFormComponent } from './quest-board-components/new-quest-form/new-quest-form.component';
import { NavBarComponent } from './shared-components/nav-bar/nav-bar.component';
import { QuestDetailsModalComponent } from './quest-board-components/quest-details-modal/quest-details-modal.component';
import { environment } from '../environments/environment';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { SideNavComponent } from './shared-components/side-nav/side-nav.component';

import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from "@angular/fire/compat/auth";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFormComponent } from './quest-board-components/user-form/user-form.component';



const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // tosUrl: '<your-tos-link>',
  // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  declarations: [
    AppComponent,
    AppQuestBoardComponent,
    AppQuestListingComponent,
    NewQuestFormComponent,
    NavBarComponent,
    QuestDetailsModalComponent,
    OnlyNumbersDirective,
    SideNavComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FontAwesomeModule
  ],
  providers: [
    // {provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 4200] : undefined},
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }