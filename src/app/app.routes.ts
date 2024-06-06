import { Routes } from '@angular/router';
import {NotFoundComponent} from "../components/not-found/not-found.component";
import {EditorPageComponent} from "../pages/editor-page/editor-page.component";
import {MascotMinterPageComponent} from "../pages/mascot-minter/mascot-minter-page.component";
import {MascotInventoryPageComponent} from "../pages/mascot-selector-page/mascot-inventory-page.component";
import {CommandCenterComponent} from "../pages/command-center/command-center.component";

export const routes: Routes = [
  { path: 'editor', component: EditorPageComponent },
  { path: 'mint', component: MascotMinterPageComponent },
  { path: 'command', component: CommandCenterComponent },
  { path: 'inventory', component: MascotInventoryPageComponent },
  { path: '', component: EditorPageComponent },
  { path: '**', component: NotFoundComponent },
];
