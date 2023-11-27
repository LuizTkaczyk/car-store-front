import { Component } from '@angular/core';
import { ChangesService } from '../shared/changes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  selector: string = ".main-panel";
  
  constructor(private changes: ChangesService) { }
  onScroll() {
    this.changes.callPost(true);
  }

}
