import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './app.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TriviaService } from './trivia.service';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameQuestionComponent } from './game-question/game-question.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewGameDialogComponent,
    GameBoardComponent,
    GameQuestionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    TriviaService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
