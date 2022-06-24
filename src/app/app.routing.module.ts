import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthContainerComponent } from "./auth/auth-container/auth-container.component";
import { CanActivateAuth } from "./auth/auth-guard.service";
import { HomeComponent } from "./home/home.component";


const routes: Routes = [
  {
    path: "", 
    component: AuthContainerComponent,
  },
  {
    path: "home", 
    component: HomeComponent,
    canActivate: [CanActivateAuth]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
