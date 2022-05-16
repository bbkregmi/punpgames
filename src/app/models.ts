export interface TriviaQuestion {
  category: string,
  type: 'multiple' | 'boolean',
  difficulty: 'easy' | 'medium' | 'hard',
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
  viewed?: boolean,
}

export interface OpenApiResponse {
  response_code: number,
  results: TriviaQuestion[],
}