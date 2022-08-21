import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Items } from '../../models';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-dialog-box-items',
  templateUrl: './dialog-box-items.component.html',
  styleUrls: ['./dialog-box-items.component.css']
})
export class DialogBoxItemsComponent implements OnInit{

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  action:string;
  local_data:any;

  ngOnInit() {
    /*this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );*/
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  

  constructor(public dialogRef: MatDialogRef<DialogBoxItemsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Items) { 
      console.log("data dialog"); 
      console.log(data);
      this.local_data = {...data};
      this.action = this.local_data.action;
    }

    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }

}
