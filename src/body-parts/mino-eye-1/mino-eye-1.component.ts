import {Component} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-eye-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-eye-1.component.html',
  styleUrl: './mino-eye-1.component.scss'
})
export class MinoEye1Component extends BaseComponent {
  override x: number = 140;
  override y: number = 150;
  eyeColor =  "#59433d";
  pupilColor =  "#44322c";

  getProperties(){
    return ['eyeColor', 'pupilColor']
  }
}


