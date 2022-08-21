import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/pages/auth/services';
import { ItemsService } from 'src/app/pages/items/services';
import { Router } from '@angular/router';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit{
  selectedValue: string;
  myControl: FormControl = new FormControl();
  roles: Role[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  action:string;
  local_data:any;

  ngOnInit() {
    this._itemsservice.loadItemsSelectData().subscribe({
      next: data =>{
        console.log("data")
        console.log(data["status"])
        if(data["status"] == "Token is Expired")
        {
          this.userService.signOut();
          this.router.navigate(['/login']);
        }
        
      }
    });
  }

  constructor(private userService: AuthService,
    private _itemsservice: ItemsService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Persona) { 
      console.log("data");
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
