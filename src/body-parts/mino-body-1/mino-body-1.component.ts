import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";

@Component({
  selector: 'app-mino-body-1',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './mino-body-1.component.html',
  styleUrl: './mino-body-1.component.scss'
})
export class MinoBody1Component extends BaseComponent {
  borderColor = "#1b1a18";
  bodyColor = "#724035";
  override x: number = 100;
  override y: number = 260;

  getProperties(){
    return ['borderColor', 'bodyColor']
  }
}


