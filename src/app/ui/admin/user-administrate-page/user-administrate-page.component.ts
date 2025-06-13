import { Component, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../../main/component-main/component-main.component';

@Component({
  selector: 'user-administrate-page',
  templateUrl: './user-administrate-page.component.html',
  styleUrl: './user-administrate-page.component.css'
})
export class UserAdministratePageComponent extends ComponentMainComponent implements OnInit{
  data: any = {};

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
       this.data = JSON.parse(params['data']);

      console.log(this.data);
    });
  }

}
