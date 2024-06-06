import {Component} from '@angular/core';
import {BaseComponent} from "../../../../base-component.directive";

@Component({
  selector: 'app-mino-right-leg-1',
  standalone: true,
  imports: [],
  templateUrl: './mino-right-leg-1.component.html',
  styleUrl: './mino-right-leg-1.component.scss'
})
export class MinoRightLeg1Component extends BaseComponent {
  borderColor = "#1b1a18";
  bodyColor = "#724035";
  color1 = "#474645";
  override x: number = 120;
  override y: number = 0;

  getProperties(){
    return ['borderColor', 'bodyColor', 'color1']
  }
}
