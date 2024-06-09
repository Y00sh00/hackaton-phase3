import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";

@Component({
  selector: 'app-mino-pants-1',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './mino-pants-1.component.html',
  styleUrl: './mino-pants-1.component.scss'
})
export class MinoPants1Component extends BaseComponent {
  color1 = "#625246";
  borderColor = "#1b1a18";
  override x: number = 100;
  override y: number = 408;

  getProperties(){
    return ['borderColor', 'color1']
  }
}


