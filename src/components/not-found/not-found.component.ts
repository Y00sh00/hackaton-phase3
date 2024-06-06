import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
