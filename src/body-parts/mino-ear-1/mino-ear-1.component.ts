import {Component} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-ear-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-ear-1.component.html',
  styleUrl: './mino-ear-1.component.scss'
})
export class MinoEar1Component extends BaseComponent {
  bodyColor = "#724035";
  override x: number = -40;
  override y: number = 130;

  getProperties(){
    return ['bodyColor']
  }
}


