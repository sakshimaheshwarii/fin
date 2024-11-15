import { Component } from '@angular/core';

@Component({
  selector: 'app-commonissuesolution',
  templateUrl: './commonissuesolution.component.html',
  styleUrls: ['./commonissuesolution.component.css']
})
export class CommonissuesolutionComponent {
router: any;
goBack() {
this.router.navigate('../')};
issueType: any;

}
