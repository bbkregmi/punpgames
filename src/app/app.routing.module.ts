import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthContainerComponent } from "./auth/auth-container/auth-container.component";
import { CanActivateAuth } from "./auth/auth-guard.service";
import { ChatComponent } from "./chat/chat.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";


const routes: Routes = [
  {
    path: "",
    component: UserDashboardComponent,
    canActivate: [CanActivateAuth]
  },
  {
    path: "login", 
    component: AuthContainerComponent,
  },
  {
    path: "chat",
    component: ChatComponent,
    canActivate: [CanActivateAuth]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
