import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faWarning} from "@fortawesome/free-solid-svg-icons";
import {CountdownComponent} from "../../components/countdown/countdown.component";

@Component({
  selector: 'app-command-center',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent,
    CountdownComponent
  ],
  templateUrl: './command-center.component.html',
  styleUrl: './command-center.component.scss'
})
export class CommandCenterComponent {
  alertIcon = faWarning;

  protected readonly faWarning = faWarning;
}
