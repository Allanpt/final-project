import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menuItem.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  

  @Input() items: MenuItem[] = [];
}
