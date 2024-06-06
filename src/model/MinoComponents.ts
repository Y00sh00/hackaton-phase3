import {MinoBody1Component} from "../body-parts/mino-body-1/mino-body-1.component";
import {MinoHead1Component} from "../body-parts/mino-head-1/mino-head-1.component";
import {MinoLeftLeg1Component} from "../body-parts/mino-legs-1/parts/mino-left-leg-1/mino-left-leg-1.component";
import {MinoRightLeg1Component} from "../body-parts/mino-legs-1/parts/mino-right-leg-1/mino-right-leg-1.component";
import {MinoPants1Component} from "../body-parts/mino-pants-1/mino-pants-1.component";
import {MinoBelt1Component} from "../body-parts/mino-belt-1/mino-belt-1.component";
import {MinoEar1Component} from "../body-parts/mino-ear-1/mino-ear-1.component";
import {MinoMouth1Component} from "../body-parts/mino-mouth-1/mino-mouth-1.component";
import {MinoNosering1Component} from "../body-parts/mino-nosering-1/mino-nosering-1.component";
import {MinoGotee1Component} from "../body-parts/mino-gotee-1/mino-gotee-1.component";
import {MinoHornLeft1Component} from "../body-parts/mino-horns-1/parts/mino-horn-left-1/mino-horn-left-1.component";
import {MinoHornRight1Component} from "../body-parts/mino-horns-1/parts/mino-horn-right-1/mino-horn-right-1.component";
import {MinoEye1Component} from "../body-parts/mino-eye-1/mino-eye-1.component";
import {MinoEye2Component} from "../body-parts/mino-eye-2/mino-eye-2.component";
import {MinoRightArm1Component} from "../body-parts/mino-arms-1/parts/mino-right-arm-1/mino-right-arm-1.component";
import {MinoRightArm2Component} from "../body-parts/mino-arms-2/parts/mino-right-arm-2/mino-right-arm-2.component";
import {MinoLeftHand1Component} from "../body-parts/mino-left-hand-1/mino-left-hand-1.component";
import {MinoLeftArm1Component} from "../body-parts/mino-arms-1/parts/mino-left-arm-1/mino-left-arm-1.component";
import {MinoLeftArm2Component} from "../body-parts/mino-arms-2/parts/mino-left-arm-2/mino-left-arm-2.component";
import {MinoRightHand1Component} from "../body-parts/mino-right-hand-1/mino-right-hand-1.component";
import {Type} from "@angular/core";
import {BaseComponent} from "../base-component.directive";
import {MinoHorns1Component} from "../body-parts/mino-horns-1/mino-horns-1.component";
import {MinoLegs1Component} from "../body-parts/mino-legs-1/mino-legs-1.component";
import {MinoHair1Component} from "../body-parts/mino-hair-1/mino-hair-1.component";
import {BodyEmptyComponent} from "../body-parts/body-empty/body-empty.component";
import {MinoArms1Component} from "../body-parts/mino-arms-1/mino-arms-1.component";
import {MinoArms2Component} from "../body-parts/mino-arms-2/mino-arms-2.component";
import {MinoArms3Component} from "../body-parts/mino-arms-3/mino-arms-3.component";
import {MinoRightArm3Component} from "../body-parts/mino-arms-3/parts/mino-right-arm-3/mino-right-arm-3.component";
import {MinoLeftArm3Component} from "../body-parts/mino-arms-3/parts/mino-left-arm-3/mino-left-arm-3.component";

export const MinoComponents: { [key: string]: Type<BaseComponent> } = {
  'mino-body-1': MinoBody1Component,
  'mino-head-1': MinoHead1Component,
  'mino-left-leg-1': MinoLeftLeg1Component,
  'mino-right-leg-1': MinoRightLeg1Component,
  'mino-pants-1': MinoPants1Component,
  'mino-belt-1': MinoBelt1Component,
  'mino-ear-1': MinoEar1Component,
  'mino-mouth-1': MinoMouth1Component,
  'mino-nosering-1': MinoNosering1Component,
  'mino-gotee-1': MinoGotee1Component,
  'mino-horn-left-1': MinoHornLeft1Component,
  'mino-horn-right-1': MinoHornRight1Component,
  'mino-eye-1': MinoEye1Component,
  'mino-eye-2': MinoEye2Component,
  'mino-right-arm-1': MinoRightArm1Component,
  'mino-right-arm-2': MinoRightArm2Component,
  'mino-right-arm-3': MinoRightArm3Component,
  'mino-left-hand-1': MinoLeftHand1Component,
  'mino-left-arm-1': MinoLeftArm1Component,
  'mino-left-arm-2': MinoLeftArm2Component,
  'mino-left-arm-3': MinoLeftArm3Component,
  'mino-right-hand-1': MinoRightHand1Component,
  'mino-horns-1': MinoHorns1Component,
  'mino-legs-1': MinoLegs1Component,
  'mino-arms-1': MinoArms1Component,
  'mino-arms-2': MinoArms2Component,
  'mino-arms-3': MinoArms3Component,
  'mino-hair-1': MinoHair1Component,
  'body-empty': BodyEmptyComponent
};
