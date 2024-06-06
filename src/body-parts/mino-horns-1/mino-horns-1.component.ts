import {Component, ComponentRef} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";
import {MinoHornRight1Component} from "./parts/mino-horn-right-1/mino-horn-right-1.component";
import {MinoHornLeft1Component} from "./parts/mino-horn-left-1/mino-horn-left-1.component";
import {SlotData} from "../../model/Mascot";

@Component({
  selector: 'app-mino-horns-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent,
    MinoHornRight1Component,
    MinoHornLeft1Component
  ],
  templateUrl: './mino-horns-1.component.html',
  styleUrl: './mino-horns-1.component.scss'
})
// Example of a composed component
export class MinoHorns1Component extends BaseComponent {
  color1 = "#47433c";
  override x: number = -20;
  override y: number = -10;
  leftHornOptions: SlotData;
  rightHornOptions: SlotData;

  override ngOnInit(): void {
    // Call the ngOnInit of the superclass
    super.ngOnInit();

    this.createSlots();
    this.drawSlot(this.leftHornOptions);
    this.drawSlot(this.rightHornOptions);
  }

  getProperties() {
    return ['color1']
  }

  private createSlots() {
    this.leftHornOptions = Object.assign({}, this.options);
    this.leftHornOptions.selectedComponent = "mino-horn-left-1";
    this.leftHornOptions.slotName = "HornLeft";
    this.leftHornOptions.zIndex = 7;

    this.rightHornOptions = Object.assign({}, this.options);
    this.rightHornOptions.selectedComponent = "mino-horn-right-1";
    this.rightHornOptions.slotName = "HornRight";
    this.rightHornOptions.zIndex = 4;
  }
}


