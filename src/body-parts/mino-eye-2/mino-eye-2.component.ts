import {Component} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-eye-2',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-eye-2.component.html',
  styleUrl: './mino-eye-2.component.scss'
})
export class MinoEye2Component extends BaseComponent {
  override x: number = 140;
  override y: number = 150;

  getProperties(){
    return []
  }
}


