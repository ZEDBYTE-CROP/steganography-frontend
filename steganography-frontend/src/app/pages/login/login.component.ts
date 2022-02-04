import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkCallsService } from '../../services/network-calls.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private networkcall: NetworkCallsService
  ) {}

  // variable initializing
  // public login_form: FormGroup;
  public login_form: FormGroup;
  submitError: boolean = false;
  formcontrol: any;
  userid: string;
  password: string;
  result: any;

  // functions

  onSubmit() {
    if (!this.login_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      console.log(this.login_form);

      this.userid = this.login_form.get('userid')!.value;
      this.password = this.login_form.get('password')!.value;
      console.log('params =>', this.userid, this.password);

      this.networkcall.callLoginApi(this.userid, this.password);
    } else {
      this.submitError = true;
    }
  }

  route_to_register() {
    this.router.navigate(['register']);
  }

  ngOnInit(): void {
    // form starts here

    this.login_form = this.fb.group({
      userid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
