import { Directive, HostBinding, Input } from '@angular/core';
import {
  ButtonModifier,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '../../model/button.type';

@Directive({
  selector: 'button[rootButton], a[rootButton]',
})
export class RootButton {
  @Input()
  modifier: ButtonModifier = 'primary';

  @Input()
  size: ButtonSize = 'medium';

  @Input()
  variant: ButtonVariant = 'text';

  @Input()
  shape: ButtonShape = 'rounded';

  @HostBinding('class')
  get classes(): string {
    return [
      this.getDefaultStyleClasses(),
      this.getButtonModifierClass(this.modifier),
      this.getButtonSizeClass(this.size),
      this.getButtonShapeClass(this.shape),
    ].join(' ');
  }

  getDefaultStyleClasses(): string {
    const classes = ['cursor-pointer'];

    switch (this.size) {
      case 'small':
        classes.push('h-8');
        break;
      case 'medium':
        classes.push('h-10');
        break;
      case 'large':
        classes.push('h-12');
        break;
      default:
        break;
    }

    if (this.shape === 'circle') {
      classes.push('inline-flex', 'items-center', 'justify-center');
      switch (this.size) {
        case 'small':
          classes.push('w-8');
          break;
        case 'medium':
          classes.push('w-10');
          break;
        case 'large':
          classes.push('w-12');
          break;
        default:
          break;
      }
    } else {
      switch (this.size) {
        case 'small':
          classes.push('px-2');
          break;
        case 'medium':
          classes.push('px-4');
          break;
        case 'large':
          classes.push('px-6');
          break;
        default:
          break;
      }
    }

    return classes.join(' ');
  }

  getButtonModifierClass(modifier: ButtonModifier): string {
    switch (modifier) {
      case 'primary':
        return 'bg-green-700 text-white hover:bg-green-700/90 active:bg-green-700/80';
      case 'secondary':
        return 'bg-gray-700 text-white hover:bg-gray-700/90 active:bg-gray-700/80';
      case 'danger':
        return 'bg-red-700 text-white hover:bg-red-700/90 active:bg-red-700/80';
      case 'dark':
        return 'bg-black text-white hover:bg-black/90 active:bg-gray-black/80';
      case 'ghost':
        return 'bg-transparent text-white hover:bg-gray-100/10 active:bg-gray-100/20';
      default:
        return '';
    }
  }

  getButtonSizeClass(size: ButtonSize): string {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return '';
    }
  }

  getButtonShapeClass(shape: ButtonShape): string {
    switch (shape) {
      case 'square':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-md';
      case 'circle':
        return 'rounded-full';
      default:
        return '';
    }
  }
}
