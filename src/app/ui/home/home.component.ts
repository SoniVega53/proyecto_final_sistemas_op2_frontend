import { Component, OnInit } from '@angular/core';
import { ComponentMainComponent } from '../main/component-main/component-main.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent extends ComponentMainComponent implements OnInit {

  ngOnInit(): void {
  }


}
