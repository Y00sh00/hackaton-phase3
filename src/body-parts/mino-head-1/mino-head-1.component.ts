import {Component} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-head-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-head-1.component.html',
  styleUrl: './mino-head-1.component.scss'
})
export class MinoHead1Component extends BaseComponent {
  borderColor = "#1b1a18";
  bodyColor = "#724035";
  override x: number = 0;
  override y: number = 0;

  getProperties(){
    return ['borderColor', 'bodyColor']
  }
}


