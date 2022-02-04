import { Component, OnInit } from '@angular/core';
import { NetworkCallsService } from '../../services/network-calls.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private networkcall: NetworkCallsService
  ) {}

  // variable initializing
  // public login_form: FormGroup;
  public register_form: FormGroup;
  submitError: boolean = false;
  formcontrol: any;
  name: string;
  phone: string;
  userid: number;
  password: string;
  result: any;

  // functions
  onSubmit() {
    if (!this.register_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      this.name = this.register_form.get('name')!.value;
      this.phone = this.register_form.get('phone')!.value;
      this.userid = this.register_form.get('userid')!.value;
      this.password = this.register_form.get('password')!.value;

      this.networkcall.callRegisterApi(
        this.name,
        this.phone,
        this.userid,
        this.password
      );
    } else {
      this.submitError = true;
    }
  }

  ngOnInit(): void {
    // form starts here

    this.register_form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      userid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
