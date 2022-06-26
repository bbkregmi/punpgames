import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatIconModule } from  '@angular/material/icon';
import { MatListModule } from  '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

const MODULES = [
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatMenuModule,

];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class AppMaterialModule {}
