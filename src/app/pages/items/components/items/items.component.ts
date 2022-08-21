import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Items } from '../../models/items';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { ItemsService } from '../../services';
import { AuthService } from 'src/app/pages/auth/services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxItemsComponent } from 'src/app/pages/items/components/dialog-box-items/dialog-box-items.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit, AfterViewInit {
  
  @Input() itemsTableData: Items[];
  public displayedColumns: string[] = ['id', 'name', 'created_at','operaciones'];
  dataSource: MatTableDataSource<Items> = new MatTableDataSource()
 // public dataSource: MatTableDataSource<Items>;
  public selection = new SelectionModel<Items>(true, []);
  @ViewChild(MatSort) sort: MatSort;

  public isShowFilterInput = false;
  public isSuccessful = false;
  public isSignUpFailed = false;
  public errorMessage = '';


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //public personaTableData$: Observable<Persona[]>
  
  constructor(private userService: AuthService,
              private _itemsservice: ItemsService,
              private http: HttpClient,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarItems();
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
    const dialogRef = this.dialog.open(DialogBoxItemsComponent, {
      width: '650px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("event");
      console.log(result.event);
      console.log(result.data);
      if(result.event == 'Adicionar'){
        this.insertItem(result.data);
      }else if(result.event == 'Editar'){
        this.updateRowData(result.data);
      }else if(result.event == 'Eliminar'){
        this.deleteRowData(result.data);
      }
    });
    
  }

  public cargarItems()
  {
    this._itemsservice.loadItemsTableData().subscribe({
      next: data =>{
        console.log("data")
        console.log(data["status"])
        if(data["status"] == "Token is Expired")
        {
          this.userService.signOut();
          this.router.navigate(['/login']);
        }
        
        this.dataSource = new MatTableDataSource(data["items"]);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  insertItem(row_obj:any){
    this._itemsservice.insertItem(row_obj.name)
      .subscribe(
        data => {
          if(data["status"] == "ok")
          {
            this.ngOnInit();
          }
          else if(data["status"] == "error")
          {
            this.openDialog("Error",{})
          }
          this.isSuccessful = true;
          this.isSignUpFailed = true;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }
  updateRowData(row_obj){
    console.log("row_obj");
    console.log(row_obj);
    this._itemsservice.updateItems  (row_obj).subscribe({
      next: data =>{
        if(data["status"] == "ok")
        {
          this.ngOnInit();
        }
        else if(data["status"] == "error")
        {
          this.openDialog("Error",{})
        }
        
      }
    });
  }
  deleteRowData(row_obj){
    console.log(row_obj);
    this._itemsservice.deleteItem  (row_obj).subscribe({
      next: data =>{
        if(data["status"] == "ok")
        {
          this.ngOnInit();
        }
        else if(data["status"] == "error")
        {
          this.openDialog("Error",{})
        }
        
      }
    });
  }


}
