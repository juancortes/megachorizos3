import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { routes } from '../../../../consts';

import { Items } from '../../models';
import { ItemsService } from '../../services';
import { AuthService } from 'src/app/pages/auth/services';
import { Router} from '@angular/router';
import { ItemsComponent } from '../../components';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+ localStorage.getItem('token')      
                            })
};

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.css']
})
export class ItemsPageComponent implements OnInit, AfterViewInit {
  @ViewChild(ItemsComponent) items;
  public itemsTableData$: Observable<Items[]>
  
  constructor(private userService: AuthService,
              private _itemsService: ItemsService,
              private http: HttpClient,
              private router: Router) {
    //this.personaTableData$ = service.loadPersonaTableData();
    
  }

  ngOnInit(): void {
      this._itemsService.loadItemsTableData().subscribe({
          next: data =>{
            console.log("data")
            console.log(data["items"])
            if(data.toString() == "Token Expired")
            {
              this.userService.signOut();
              this.router.navigate(['/login']);
            }
      
            this.itemsTableData$ = data["items"]
          }
      });
  }

  ngAfterViewInit() {
    this.itemsTableData$ = this.items.itemsTableData$
  }

  
  
}
