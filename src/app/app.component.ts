import { Component } from '@angular/core';
import { MenuItem } from './interfaces/menuItem.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-project';

  

  items: MenuItem[] = [
    {
      'name': 'Home',
      'url': '/home'
    },
    {
      'name': 'Profiles',
      'url': '/profile',
    },
  ]
}
