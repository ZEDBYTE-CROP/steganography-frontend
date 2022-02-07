import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkCallsService } from '../../services/network-calls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private networkcall: NetworkCallsService) { }

    public balance:number
    public user_id:string

    // functions

    route_to_create() {
      this.router.navigate(['create-stegano']);
    }

    route_to_share() {
      this.router.navigate(['shared-files']);
    }

    

  ngOnInit(): void {
    if(sessionStorage.getItem("login") === "1"){
      this.user_id = sessionStorage.getItem("userid");
    }
    else{
      this.router.navigate(['']);
    }
  }
}
