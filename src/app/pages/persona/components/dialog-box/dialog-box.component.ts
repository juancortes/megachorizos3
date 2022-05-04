import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../models';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit{

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  action:string;
  local_data:any;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Persona) { 
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
