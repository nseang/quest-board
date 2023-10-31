import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageBoardComponent } from './image-board-components/image-board/image-board.component';
import { HomeBoardComponent } from './home-board/home-board.component';

const routes: Routes = [
  { path: '', component: HomeBoardComponent },
  { path: 'imageBoard', component: ImageBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
