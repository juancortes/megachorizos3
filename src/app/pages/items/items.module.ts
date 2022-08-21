import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemsComponent } from './components/items/items.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemsPageComponent } from './containers/items-page/items-page.component';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsService } from './services';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    SharedModule,
    ItemsRoutingModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  providers: [
    ItemsService
  ]
})
export class ItemsModule { }
