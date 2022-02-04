import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkCallsService {
  constructor(private httpClient: HttpClient, private router: Router, private CommonService: CommonService) {}
  baseUrl = environment.baseUrl; //Rset API base URL
  result: any;

  getURL() {
    return this.baseUrl;
  }

  // login API
  callLoginApi(userid: string, password: string) {
    let url = this.baseUrl + '/login';
    this.httpClient
      .post(
        url,
        {
          userid: userid,
          password: password,
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          console.log(data['code']);
          if (data['status'] == "OK") {
            sessionStorage.setItem("userid", userid);
            sessionStorage.setItem("login", "1");
            this.router.navigate(['home']);
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

  // register API
  callRegisterApi(
    name: string,
    phone: string,
    userid: number,
    password: string,
  ) {
    let url = this.baseUrl + '/signup';
    this.httpClient
      .post(
        url,
        {
          name,
          phone,
          userid,
          password
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          console.log(data['message']);
          if (data['status'] == "OK") {
            this.router.navigate(['']);
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

  // text encrypt API
  callTextEncryptApi(
    userid:string,
    original_text: string
  ) {
    let url = this.baseUrl + '/textencryption';
    this.httpClient
      .post(
        url,
        {
          userid,
          original_text
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          if (data['status'] == "OK") {
            this.CommonService.setEncryptedText(data['result']['cipher'])
            sessionStorage.setItem("encryptionId", data['result']['randomPostId'])
            
            // window.location.reload()
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

  // image encrypt API
  callImageEncryptApi(
    userid:string,
    encryptionId:string,
    originalImage
  ) {
    console.log("from service", originalImage);

    // when using form data in angular
    let body = new FormData();
    body.append("userid", userid);
    body.append("encryptionId", encryptionId);
    body.append("originalImage", originalImage)
    
    let url = this.baseUrl + '/imageencryption';
    this.httpClient
      .post(
        url,
        body, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          if (data['status'] == "OK") {
            console.log("service", data['result']);
            
            this.CommonService.setSteganoImage(data['result'])
            
            
            // window.location.reload()
          }
          else{
            console.log(data);
            
            alert(data["message"])
          }
        },
        (err) => {
          console.log(err);
          return err;
        }
      );
  }


  // verify otp API
  verifyOTPApi(
    otp:string
  ) {
    let url = this.baseUrl + '/verifyOTP';
    this.httpClient
      .post(
        url,
        {
          otp
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          if (data['status'] == "OK") {
            sessionStorage.setItem("originalImage", data["result"]["originalImage"])
            sessionStorage.setItem("originalText", data["result"]["originalText"])
            this.router.navigate(['decrypt']);
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

  // generate QR code API
  generateQRCODEApi(
    userid:string,
    encryptionId:string
  ) {
    let url = this.baseUrl + '/imageqrcode';
    this.httpClient
      .post(
        url,
        {
          userid,
          encryptionId
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          if (data['status'] == "OK") {
            this.CommonService.setQRcodeImage(data['result'])
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

// share api
  ShareApi(
    peeruserid:string,
    encryptionId:string
  ) {
    let url = this.baseUrl + '/share';
    this.httpClient
      .post(
        url,
        {
          peeruserid,
          encryptionId
        }, // body
        {} // params
      )
      .subscribe(
        (data: any) => {
          if (data['status'] == "OK") {
            alert(data['message'])
            {window.location.reload();}
          }
          else{
            alert(data['message'])
            {window.location.reload();}
          }
        },
        (err) => {
          console.log(err);
          return err;
        }
      );
  }

}
