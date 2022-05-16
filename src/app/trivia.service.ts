import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TriviaService {
  private OPEN_TRIVIA_BASE_URL = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getTriviaQuestions(categories: number[]) {
    const httpCalls = [];
    for (let category of categories) {
      const numDifficulties = this.getNumQuestionsWithDifficulty();
      const easyQuestions = this.http.get(this.OPEN_TRIVIA_BASE_URL, {
        params: {
          amount: numDifficulties.numEasyQuestions,
          category: category,
          difficulty: 'easy',
        }
      })

      const mediumQuestions = this.http.get(this.OPEN_TRIVIA_BASE_URL, {
        params: {
          amount: numDifficulties.numMediumQuestions,
          category: category,
          difficulty: 'medium',
        }
      })

      const hardQuestions = this.http.get(this.OPEN_TRIVIA_BASE_URL, {
        params: {
          amount: numDifficulties.numHardQuestions,
          category: category,
          difficulty: 'hard',
        }
      });

      httpCalls.push(
        firstValueFrom(easyQuestions), 
        firstValueFrom(mediumQuestions), 
        firstValueFrom(hardQuestions));
    }

    return Promise.all(httpCalls);
  }

  private getNumQuestionsWithDifficulty() {
    const numEasyQuestions = this.randomIntFromInterval(1, 2);
    let numMediumQuestions = 0;
    if (numEasyQuestions === 1) {
      numMediumQuestions = this.randomIntFromInterval(2, 3);
    } else {
      numMediumQuestions = this.randomIntFromInterval(1, 2);
    }
    const numHardQuestions = 5 - (numEasyQuestions + numMediumQuestions);

    return {numEasyQuestions, numMediumQuestions, numHardQuestions};
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}