import { NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';

const MODULES = [
  MatDialogModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class AppMaterialModule {}
