import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss'],
})
export class NewGameDialogComponent {

  gameCreateForm = new FormControl([9,9,9,9,9]);
  numPlayers = 2;

  constructor(
    public dialogRef: MatDialogRef<NewGameDialogComponent>
  ) { }

  onCreateClick() {
    const set = new Set(this.gameCreateForm.value);
    if (set.size != this.gameCreateForm.value.length) {
      this.gameCreateForm.setErrors({
        notUnique: true
      });

      return;
    }

    this.dialogRef.close(
      {
        categories: this.gameCreateForm.value,
        numPlayers: this.numPlayers
      });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  numPlayersSelected(event: any) {
    this.numPlayers = +event.target.value;
  }

  onCategorySelect(index: number, event: any) {
    const category = +event.target.value;
    const newValues = [...this.gameCreateForm.value];
    newValues[index] = category;
    this.gameCreateForm.setValue(newValues);
    console.log(this.gameCreateForm.value)
  }


}
