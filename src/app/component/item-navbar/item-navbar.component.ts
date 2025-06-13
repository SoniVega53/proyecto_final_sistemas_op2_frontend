import { Component, Input } from '@angular/core';

@Component({
  selector: 'tem-navbar',
  templateUrl: './item-navbar.component.html',
  styleUrl: './item-navbar.component.css'
})
export class ItemNavbarComponent {

  @Input() routerLink = '';
  @Input() nameItem = '';
  @Input() safeSvg = '';

}
