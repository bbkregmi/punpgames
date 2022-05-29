import { Component, OnInit } from '@angular/core';
import { CHALLENGE_24_PROMPTS } from './challenge24-data';

@Component({
  selector: 'app-challenge24',
  templateUrl: './challenge24.component.html',
  styleUrls: ['./challenge24.component.scss']
})
export class Challenge24Component implements OnInit {

  challenge24Questions = CHALLENGE_24_PROMPTS;
  selected_array: number[] = [];
  selectedChallenge: string = "";
  questions: string[] = [];
  answer: string = "";
  showAnswer = false;

  constructor() { }

  ngOnInit(): void {
    this.onNextClicked();
  }

  onShowAnswerClicked() {
    this.showAnswer = true;
  }

  onNextClicked() {
    this.showAnswer = false;

    const nextRand = this.getNextRandomNumber();
    this.selectedChallenge = this.challenge24Questions[nextRand];
    const [question, answer] = this.selectedChallenge.split(",");
    this.questions = question.split(" ").filter(question => question.length > 0);
    this.shuffleArray(this.questions);
    this.answer = answer;

  }

  getNextRandomNumber() {
    const max = this.challenge24Questions.length - 1;
    let randIndex = -1;
    let foundNewQuestion = false;
    for (let i = 0; i < 20; i++) {
      randIndex = Math.floor(Math.random() * (max + 1));
      if (this.selected_array.indexOf(randIndex) === -1) {
        foundNewQuestion = true;
        break;
      }
    }

    if (foundNewQuestion) {
      this.selected_array.push(randIndex);
    }

    return randIndex;
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

}
