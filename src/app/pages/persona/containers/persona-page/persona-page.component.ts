import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { routes } from '../../../../consts';

import { Persona } from '../../models';
import { PersonaService } from '../../services';
import { AuthService } from 'src/app/pages/auth/services';
import { Router} from '@angular/router';
import { PersonaComponent } from '../../components/incex';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+ localStorage.getItem('token')      
                            })
};

@Component({
  selector: 'app-persona-page',
  templateUrl: './persona-page.component.html',
  styleUrls: ['./persona-page.component.css']
})
export class PersonaPageComponent implements OnInit, AfterViewInit {
  @ViewChild(PersonaComponent) persona;
  public personaTableData$: Observable<Persona[]>
  
  constructor(private userService: AuthService,
              private _personaservice: PersonaService,
              private http: HttpClient,
              private router: Router) {
    //this.personaTableData$ = service.loadPersonaTableData();
    
  }

  ngOnInit(): void {
      this._personaservice.loadPersonaTableData().subscribe({
          next: data =>{
            console.log("data")
            console.log(data["personal"])
            if(data.toString() == "Token Expired")
            {
              this.userService.signOut();
              this.router.navigate(['/login']);
            }
      
            this.personaTableData$ = data["personal"]
          }
      });
  }

  ngAfterViewInit() {
    this.personaTableData$ = this.persona.personaTableData$
  }

  
  
}
