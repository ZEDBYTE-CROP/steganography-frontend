import { Component, OnInit } from '@angular/core';
import { NetworkCallsService } from '../../services/network-calls.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.css']
})
export class SharedFilesComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    public fb: FormBuilder,
    private networkcall: NetworkCallsService
  ) { }

  public verify_form: FormGroup;
  submitError: boolean = false;
  formcontrol: any;
  userid: string;
  public result: any;
  otp:string


  onSubmit() {
    if (!this.verify_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      this.otp = this.verify_form.get('otp')!.value;
      

      this.networkcall.verifyOTPApi(
        this.otp
      );
    } else {
      this.submitError = true;
    }
  }


  ngOnInit(): void {

    // form starts here

    this.verify_form = this.fb.group({
      otp: new FormControl('', [Validators.required])
    });

    // network call to get list of posts
    let url = "http://0.0.0.0:5000" + '/list';
    this.httpClient
      .post(
        url,
        {
          userid : sessionStorage.getItem("userid")
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          if (data['status'] == "OK") {
            this.result = data["result"];
          }
          else{
            alert(data['message'])
          }
        },
        (err) => {
          console.log(err);
          return err;
        }
      );
  }


}
