import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-pop',
  templateUrl: './image-pop.component.html',
  styleUrls: ['./image-pop.component.scss']
})
export class ImagePopComponent {

  constructor(
    public dialogRef: MatDialogRef<ImagePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {imageUrl: string},
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
