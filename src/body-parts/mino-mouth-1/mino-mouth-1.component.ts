import {Component} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-mouth-1',
  standalone: true,
  imports: [
    JsonPipe,
    RenderComponent,
    NgForOf,
    NgIf,
  ],
  templateUrl: './mino-mouth-1.component.html',
  styleUrl: './mino-mouth-1.component.scss'
})
export class MinoMouth1Component extends BaseComponent {
  override x: number = 150;
  override y: number = 230;
  mouthColor = "#404041";

  getProperties(){
    return ['mouthColor']
  }
}


