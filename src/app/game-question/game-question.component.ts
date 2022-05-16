import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TriviaQuestion } from '../models';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent implements OnInit {

  selectedChoice: any;
  choices: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<GameQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TriviaQuestion,
  ) { }

  ngOnInit(): void {
    this.choices = this.getChoices(this.data);
  }

  choiceClicked(data: TriviaQuestion, choice: string) {
    this.selectedChoice = {
      correct_answer: data.correct_answer,
      selected_answer: choice
    }
  }

  closeDialog() {
    const result = this.selectedChoice.correct_answer ===
      this.selectedChoice.selected_answer ? 'Correct' : 'Incorrect';
    this.dialogRef.close(result);
  }

  getChoices(data: TriviaQuestion) {
    if (data.type === 'boolean') {
      return ['True', 'False'];
    }

    const randomIndex = Math.floor(Math.random() * (4));
    const response = [];

    let incorrectAnswerRef = 0;

    for (let i = 0; i < 4; i++) {
      if (i === randomIndex) {
        response[i] = data.correct_answer;
      } else {
        response[i] = data.incorrect_answers[incorrectAnswerRef];
        incorrectAnswerRef++;
      }
    }

    return response;
  }

}
