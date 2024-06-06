import {Component} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";
import {SlotData} from "../../model/Mascot";

@Component({
  selector: 'app-mino-arms-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-arms-1.component.html',
  styleUrl: './mino-arms-1.component.scss'
})
// Example of a composed component
export class MinoArms1Component extends BaseComponent {
  bodyColor = "#724035";
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
    return ['bodyColor']
  }

  private createSlots() {
    this.leftArmOptions = Object.assign({}, this.options);
    this.leftArmOptions.selectedComponent = "mino-left-arm-1";
    this.leftArmOptions.slotName = "LeftArm";
    this.leftArmOptions.zIndex = 4;

    this.rightArmOptions = Object.assign({}, this.options);
    this.rightArmOptions.selectedComponent = "mino-right-arm-1";
    this.rightArmOptions.slotName = "RightArm";
    this.rightArmOptions.zIndex = 9;
  }
}


