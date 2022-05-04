import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Persona } from '../../models/persona';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { PersonaService } from '../../services';
import { AuthService } from 'src/app/pages/auth/services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/pages/persona/components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})

export class PersonaComponent implements OnInit, AfterViewInit {
  @Input() personaTableData: Persona[];
  public displayedColumns: string[] = ['id', 'nombres', 'cedula', 'correo', 'estado','operaciones'];
  dataSource: MatTableDataSource<Persona> = new MatTableDataSource()
 // public dataSource: MatTableDataSource<Persona>;
  public selection = new SelectionModel<Persona>(true, []);
  @ViewChild(MatSort) sort: MatSort;

  public isShowFilterInput = false;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //public personaTableData$: Observable<Persona[]>
  
  constructor(private userService: AuthService,
              private _personaservice: PersonaService,
              private http: HttpClient,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this._personaservice.loadPersonaTableData().subscribe({
      next: data =>{
        console.log("data")
        console.log(data["status"])
        if(data["status"] == "Token is Expired")
        {
          this.userService.signOut();
          this.router.navigate(['/login']);
        }
        
        this.dataSource = new MatTableDataSource(data["personal"]);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.isShowFilterInput = !this.isShowFilterInput;
    //this.dataSource = new MatTableDataSource<Persona>(this.personaTableData$);
  }

  public openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '650px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.event);
      if(result.event == 'Adicionar'){
        this.addRowData(result.data);
      }else if(result.event == 'Editar'){
        this.updateRowData(result.data);
      }else if(result.event == 'Eliminar'){
        this.deleteRowData(result.data);
      }
    });
    
  }

  addRowData(row_obj:any){
    console.log("row_obj");
    console.log(row_obj);
    /*var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name
    });
    this.table.renderRows();*/
    
  }
  updateRowData(row_obj){
    console.log("row_obj");
    console.log(row_obj);
    this._personaservice.updatePersona(row_obj).subscribe({
      next: data =>{
        if(data["status"] == "ok")
        {
          this.ngOnInit();
        }
        
      }
    });
    /*this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });*/
  }
  deleteRowData(row_obj){
    /*this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });*/
  }


}
