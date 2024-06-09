import { Component } from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RenderComponent} from "../../render/render.component";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    JsonPipe,
    NgForOf,
    NgIf,
    RenderComponent,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent {

}
