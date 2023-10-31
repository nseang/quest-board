import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestReceptionistService } from 'src/app/quest-receptionist.service';
import { ImagePopComponent } from '../image-pop/image-pop.component';

@Component({
  selector: 'app-image-board',
  templateUrl: './image-board.component.html',
  styleUrls: ['./image-board.component.scss']
})
export class ImageBoardComponent {
  imageBoard = 'wilsonwed'
  imageList: any[] | undefined;

  constructor(
    private questService: QuestReceptionistService,
    public dialog: MatDialog

  ) {
    document.body.style.backgroundColor = 'black'
  }

  ngOnInit() {
    this.questService.setCurrentBoard(this.imageBoard);
    this.imageList = this.questService.getImages();
    console.log('imageList', this.imageList)
  }

  popOutImage(imageUrl: string) {
    console.log('test')
    const dialogRef = this.dialog.open(ImagePopComponent, {
      data: imageUrl
    })
  }

}
