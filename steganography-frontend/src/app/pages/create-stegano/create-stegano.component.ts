import { Component, OnInit } from '@angular/core';
import { NetworkCallsService } from '../../services/network-calls.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-create-stegano',
  templateUrl: './create-stegano.component.html',
  styleUrls: ['./create-stegano.component.css']
})
export class CreateSteganoComponent implements OnInit {

  constructor(public fb: FormBuilder, private networkcall: NetworkCallsService, private CommonService: CommonService) { }

  // variable initializing
  // public login_form: FormGroup;
  public plaintext_form: FormGroup;
  public share_form: FormGroup;
  submitError: boolean = false;
  formcontrol: any;
  userid: string;
  encryptionId:string
  original_text: string;
  original_image
  result: any;
  public encrypt:string
  Encrypted_Text: string
  selectedFile : File
  steganoFile = ""
  original_preview = ""
  qrcode = ""
  peeruserid:string

  // functions

  selectFile(event) {
    if (event.target.files) {
      var reader = new FileReader()
      this.selectedFile = <File>event.target.files[0]
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.original_preview = event.target.result
      }
    }
  }

  textEncrypt() {
    if (!this.plaintext_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      console.log(this.plaintext_form);

      this.userid = sessionStorage.getItem("userid");
      this.original_text = this.plaintext_form.get('original_text')!.value;
      console.log('params =>', this.userid, this.original_text);

      this.networkcall.callTextEncryptApi(this.userid, this.original_text);
    } else {
      this.submitError = true;
    }
    setTimeout(() => {
      this.encrypt = this.CommonService.getEncryptedText()
      console.log(this.encrypt);
    }, 1000);
  }

  imageEncrypt() {
    if (!this.plaintext_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      console.log(this.plaintext_form);

      this.userid = sessionStorage.getItem("userid");
      console.log("from ts",this.userid);
      
      this.encryptionId = sessionStorage.getItem("encryptionId");
      this.original_image = this.selectedFile
      

      this.networkcall.callImageEncryptApi(this.userid, this.encryptionId, this.original_image);
    } else {
      this.submitError = true;
    }
    setTimeout(() => {
      this.steganoFile = this.CommonService.getSteganoImage()
      console.log(this.steganoFile);
    }, 3000);
  }


  generateQR() {
    if (!this.plaintext_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      console.log(this.plaintext_form);

      this.userid = sessionStorage.getItem("userid");
      this.encryptionId = sessionStorage.getItem("encryptionId");
      
      this.networkcall.generateQRCODEApi(this.userid, this.encryptionId);
    } else {
      this.submitError = true;
    }
    setTimeout(() => {
      this.qrcode = this.CommonService.getQRcodeImage()
      console.log(this.steganoFile);
    }, 3000);
  }


  share() {
    if (!this.plaintext_form.invalid) {
      console.log('submitted successfully');
      this.submitError = false;
      console.log(this.plaintext_form);

      this.peeruserid = this.share_form.get('peeruserid')!.value;
      console.log(this.peeruserid);
      
      this.encryptionId = sessionStorage.getItem("encryptionId");
      
      this.networkcall.ShareApi(this.peeruserid, this.encryptionId);
    } else {
      this.submitError = true;
    }
  }
  

  ngOnInit(): void {
    // form starts here
    this.share_form = this.fb.group({
      peeruserid: new FormControl('', [Validators.required])
    });

    this.plaintext_form = this.fb.group({
      original_text: new FormControl('', [Validators.required])
    });
  }
}
