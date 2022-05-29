import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Challenge24Component } from "./challenge24/challenge24.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "trivia", component: DashboardComponent},
  {path: "challenge24", component: Challenge24Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
