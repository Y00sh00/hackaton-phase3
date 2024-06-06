import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";

@Component({
  selector: 'app-mino-belt-1',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './mino-belt-1.component.html',
  styleUrl: './mino-belt-1.component.scss'
})
export class MinoBelt1Component extends BaseComponent {
  color1 = "#9b8b75";
  override x: number = 102;
  override y: number = 390;

  getProperties(){
    return ['color1']
  }
}


