import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css']
})
export class DecryptComponent implements OnInit {

  constructor() { }
  public original_image:string
  public original_text:string

  ngOnInit(): void {

    this.original_image = sessionStorage.getItem("originalImage")
    this.original_text = sessionStorage.getItem("originalText")
  }
}
