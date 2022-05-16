import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameQuestionComponent } from '../game-question/game-question.component';
import { TriviaQuestion } from '../models';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {


  @Input() questions: TriviaQuestion[][] = [];
  @Input() numPlayers: number = 2;

  playersArray: {isTurn: boolean, score: number}[] = [];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < this.numPlayers; i++) {
      const player = {
        isTurn: false,
        score: 0,
      }
      this.playersArray.push(player);
    }

    this.playersArray[0].isTurn = true;
  }

  onQuestionClick(question: TriviaQuestion, questionIndex: number) {
    if (question.viewed) return;

    const score = (questionIndex + 1) * 100;

    question.viewed = true;
    const dialogRef = this.dialog.open(GameQuestionComponent, 
      {
        data: question,
        width: '100vw',
        height: '100vh',
        panelClass: 'game-question-backdrop'
      });

      dialogRef.afterClosed().subscribe(result => {
        const turnPlayerIndex = this.playersArray.findIndex(player => player.isTurn);

        if (result === 'Correct') {
          this.playersArray[turnPlayerIndex].score += score;
        } else {
          this.playersArray[turnPlayerIndex].isTurn = false;
          this.playersArray[(turnPlayerIndex + 1) % this.numPlayers].isTurn = true;
        }
      })
  }

}
