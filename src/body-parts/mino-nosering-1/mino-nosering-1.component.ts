import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-nosering-1',
  standalone: true,
  imports: [
    JsonPipe,
    RenderComponent,
  ],
  templateUrl: './mino-nosering-1.component.html',
  styleUrl: './mino-nosering-1.component.scss'
})
export class MinoNosering1Component extends BaseComponent {
  override x: number = 0;
  override y: number = 0;
  color1 = "#dbb045";

  getProperties(){
    return ['color1']
  }
}


