import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input, OnChanges, Renderer2, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CharacterConfig, Slot} from "../model/Character";
import {CommonModule} from "@angular/common";
import {BaseComponent} from "../base-component.directive";
import {MinoComponents} from "../model/MinoComponents";
import {SlotData} from "../model/Mascot";

@Component({
  selector: 'app-render',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './render.component.html',
  styleUrl: './render.component.scss'
})
export class RenderComponent implements AfterViewInit, OnChanges {

  // TODO z-index on sub components can't go higher than the parent. As a result the Horns need to be outside of
  //  the head to be behind and above. But when you put the hair in the head it's impossible to move it behind the horn

  @Input() options: SlotData;
  @Input() config: CharacterConfig;
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  componentMap;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {
    // When we have multiple character types we change this
    this.componentMap = MinoComponents;
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // When the character settings changes we need to redraw the entire component
    if (changes['config']) {
      this.loadComponent();
    }
  }

  // Todo This is Duplicated in the BaseComponent, solve this later for maintainability
  loadComponent() {
    // @ts-ignore
    if (this.options && this.options.selectedComponent && this.componentMap[this.options.selectedComponent]) {
      // @ts-ignore
      const component = this.componentMap[this.options.selectedComponent];
      this.container.clear();
      const componentRef: ComponentRef<BaseComponent> = this.container.createComponent(component);
      componentRef.instance.options = this.options;
      componentRef.instance.config = this.config;

      // Set z-index style
      this.renderer.setStyle(componentRef.location.nativeElement, 'z-index', this.options.zIndex);
      this.renderer.setStyle(componentRef.location.nativeElement, 'position', 'absolute');

      // We obtain the X & Y from the component ref as it takes into account default value and slot value
      // This ensures the subcomponents stay pinned to the parent
      this.renderer.setStyle(componentRef.location.nativeElement, 'margin-top', `${componentRef.instance.y}px`);
      this.renderer.setStyle(componentRef.location.nativeElement, 'margin-left', `${componentRef.instance.x}px`);

      // Required because we set the parameters on the instance after component creation
      this.cdr.detectChanges();
    }
  }
}
