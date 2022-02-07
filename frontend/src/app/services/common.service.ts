import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  encrypted:string
  steganoImage:string
  qrimage:string

  setEncryptedText = (text) =>
  {
    console.log("service-text", text);
    
    this.encrypted = text
  }

  getEncryptedText = () => 
  {
    console.log("service", this.encrypted);
    return this.encrypted
  }

  setSteganoImage = (image) =>
  {
    console.log("service-image", image);
    
    this.steganoImage = image
  }

  getSteganoImage = () => 
  {
    return this.steganoImage
  }

  setQRcodeImage = (image) =>
  {
    console.log("service-image", image);
    
    this.qrimage = image
  }

  getQRcodeImage = () => 
  {
    return this.qrimage
  }
}
