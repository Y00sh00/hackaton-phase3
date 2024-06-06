import {
  AfterViewInit, ApplicationRef,
  ChangeDetectorRef,
  ComponentRef,
  Directive, ElementRef, EmbeddedViewRef, Injector,
  Input,
  OnChanges, OnDestroy,
  OnInit, Renderer2,
  SimpleChanges, ViewChild, ViewContainerRef
} from '@angular/core';
import {CharacterConfig, Slot} from "./model/Character";
import {MinoComponents} from "./model/MinoComponents";
import {EditorService} from "./services/editor.service";
import {SlotData} from "./model/Mascot";

@Directive()
export abstract class BaseComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() options: SlotData;
  @Input() config: CharacterConfig;
  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  componentMap;
  x: number = 0;
  y: number = 0;
  // TODO implement rotation at some point:   transform: rotate(9deg);

  constructor(public cdr: ChangeDetectorRef, public renderer: Renderer2, public slotService: EditorService) {
    // When we have multiple character types we change this
    this.componentMap = MinoComponents;
  }

  ngOnInit(): void {
    this.assignOptionProperties(this.getProperties());
  }

  ngAfterViewInit() {
    this.loadSubComponents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && !changes['options'].isFirstChange()) {
      this.assignOptionProperties(this.getProperties());
    }
  }

  assignOptionProperty(optionKey: string): void {
    // @ts-ignore //TODO fix me later
    if (this.options && optionKey in this.options && this.options[optionKey]) {
      // @ts-ignore //TODO fix me later
      (this as any)[optionKey] = this.options[optionKey];
    } else {
      this.assignTraits(optionKey);
    }
  }

  assignOptionProperties(properties: string[]): void {
    // Assign the properties
    properties.forEach(item => this.assignOptionProperty(item));

    // Always assign X & Y
    this.assignOptionProperty('x')
    this.assignOptionProperty('y')
  }

  private assignTraits(optionKey: string) {
    // The main color of the body of the character

    if (optionKey === 'bodyColor') {
      const bodyColor = this.config.traits.find(item => item.traitSlot === 'bodyColor');
      if (bodyColor && bodyColor.optionValue) {
        (this as any)[optionKey] = bodyColor.optionValue;
      }
    }

  }


  loadSubComponents() {
    if (this.options && this.options.slots) {
      this.options.slots.forEach((slot) => {
        this.drawSlot(slot);
      });
      // Required because we set the parameters on the instance after component creation
      this.cdr.detectChanges();
    }
  }

  drawSlot(slot: SlotData) {
    if (slot && slot.selectedComponent && this.componentMap[slot.selectedComponent]) {
      const component = this.componentMap[slot.selectedComponent];
      const componentRef: ComponentRef<BaseComponent> = this.container.createComponent(component);
      componentRef.instance.options = slot;
      componentRef.instance.config = this.config;

      // Set Style & Z-Index
      this.renderer.setStyle(componentRef.location.nativeElement, 'z-index', slot.zIndex);
      this.renderer.setStyle(componentRef.location.nativeElement, 'position', 'absolute');

      // We obtain the X & Y from the component ref as it takes into account default value and slot value
      // This ensures the subcomponents stay pinned to the parent
      this.renderer.setStyle(componentRef.location.nativeElement, 'margin-top', `${componentRef.instance.y}px`);
      this.renderer.setStyle(componentRef.location.nativeElement, 'margin-left', `${componentRef.instance.x}px`);
    }
    // Required because we set the parameters on the instance after component creation
    this.cdr.detectChanges();
  }

  // Abstract method to enforce implementation in subclasses
  abstract getProperties(): string[];
}
