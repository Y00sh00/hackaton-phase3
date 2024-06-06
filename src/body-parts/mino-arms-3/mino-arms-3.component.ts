import {Component} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";
import {SlotData} from "../../model/Mascot";

@Component({
  selector: 'app-mino-arms-3',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-arms-3.component.html',
  styleUrl: './mino-arms-3.component.scss'
})
// Example of a composed component
export class MinoArms3Component extends BaseComponent {
  bodyColor = "#724035";
  color1 = "#b0af9b";
  color2 = "#8e7c75"; // hoof color

  override x: number = 0;
  override y: number = 0;
  leftArmOptions: SlotData;
  rightArmOptions: SlotData;

  override ngOnInit(): void {
    // Call the ngOnInit of the superclass
    super.ngOnInit();

    this.createSlots();
    this.drawSlot(this.leftArmOptions);
    this.drawSlot(this.rightArmOptions);
  }

  getProperties() {
    return ['bodyColor', 'color1', 'color2']
  }

  private createSlots() {
    this.leftArmOptions = Object.assign({}, this.options);
    this.leftArmOptions.selectedComponent = "mino-left-arm-3";
    this.leftArmOptions.slotName = "LeftArm";
    this.leftArmOptions.zIndex = 4;

    this.rightArmOptions = Object.assign({}, this.options);
    this.rightArmOptions.selectedComponent = "mino-right-arm-3";
    this.rightArmOptions.slotName = "RightArm";
    this.rightArmOptions.zIndex = 9;
  }
}


