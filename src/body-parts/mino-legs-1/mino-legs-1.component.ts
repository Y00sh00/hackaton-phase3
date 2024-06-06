import {Component} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";
import {SlotData} from "../../model/Mascot";

@Component({
  selector: 'app-mino-legs-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent,
  ],
  templateUrl: './mino-legs-1.component.html',
  styleUrl: './mino-legs-1.component.scss'
})
// Example of a composed component
export class MinoLegs1Component extends BaseComponent {
  borderColor = "#1b1a18";
  bodyColor = "#724035";
  color1 = "#474645";
  override x: number = 100;
  override y: number = 430;

  leftLegOptions: SlotData;
  rightLegOptions: SlotData;

  getProperties(){
    return ['borderColor', 'bodyColor', 'color1']
  }

  override ngOnInit(): void {
    // Call the ngOnInit of the superclass
    super.ngOnInit();

    this.createSlots();
    this.drawSlot(this.leftLegOptions);
    this.drawSlot(this.rightLegOptions);
  }

  private createSlots() {
    this.leftLegOptions = Object.assign({}, this.options);
    this.leftLegOptions.selectedComponent = "mino-left-leg-1";
    this.leftLegOptions.slotName = "LeftLeg";

    this.rightLegOptions = Object.assign({}, this.options);
    this.rightLegOptions.selectedComponent = "mino-right-leg-1";
    this.rightLegOptions.slotName = "RightLeg";
  }
}


