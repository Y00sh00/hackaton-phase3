import {Component} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-hair-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-hair-1.component.html',
  styleUrl: './mino-hair-1.component.scss'
})
export class MinoHair1Component extends BaseComponent {
  color1 = '#444342';
  color2 = '#faac22';
  hairDetailColor = '#1b1a18';

  override x: number = -8;
  override y: number = -129;

  getProperties() {
    return ['color1', 'color2', 'hairDetailColor']
  }
}


