import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";

@Component({
  selector: 'app-body-empty',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './body-empty.component.html',
  styleUrl: './body-empty.component.scss'
})
export class BodyEmptyComponent extends BaseComponent {
  override x: number = 0;
  override y: number = 0;

  getProperties(){
    return []
  }
}


