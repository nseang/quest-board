import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppQuestListingComponent } from './quest-board-components/app-quest-listing/app-quest-listing.component';
import { AppQuestBoardComponent } from './quest-board-components/app-quest-board/app-quest-board.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NewQuestFormComponent } from './quest-board-components/new-quest-form/new-quest-form.component';
import { NavBarComponent } from './shared-components/nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QuestDetailsModalComponent } from './quest-board-components/quest-details-modal/quest-details-modal.component';








@NgModule({
  declarations: [
    AppComponent,
    AppQuestBoardComponent,
    AppQuestListingComponent,
    NewQuestFormComponent,
    NavBarComponent,
    QuestDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
