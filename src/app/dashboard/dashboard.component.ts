import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { mockResponse } from '../mock';
import { OpenApiResponse, TriviaQuestion } from '../models';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';
import { TriviaService } from '../trivia.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  gameQuestions: TriviaQuestion[][] = [];
  numPlayers = 2;
  constructor(
    public dialog: MatDialog,
    private triviaService: TriviaService,
  ) {}

  createNewGame() {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.numPlayers = result.numPlayers;
      this.triviaService.getTriviaQuestions(result.categories).then(response => {
        this.formatResponse(response as OpenApiResponse[]);
      })
    })
  }

  formatResponse(responses: OpenApiResponse[]) {

    for (let i = 0; i < responses.length; i+=3) {
      const easyQuestions = responses[i].results
      const mediumQuestions = responses[i + 1].results;
      const hardQuestions = responses[i + 2].results;

      const categoryQuestions = easyQuestions.concat(mediumQuestions).concat(hardQuestions);

      this.gameQuestions.push(categoryQuestions);
    }
  }
}
