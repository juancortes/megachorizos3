import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss']
})
export class SignFormComponent implements OnInit {

  //constructor(private authService: AuthService) { }

  @Output() sendSignForm = new EventEmitter<void>();
  public form: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required])
    });
  }

  public sign(): void {
    console.log(this.form);
    if (this.form.valid) {
      console.log("valid");
      this.sendSignForm.emit();
    }
  }
}
