import { Component, HostBinding, Input } from '@angular/core';
import {
  AvatarModifier,
  AvatarShape,
  AvatarSize,
} from '../../model/avatar.type';

@Component({
  selector: 'root-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class RootAvatar {
  private _value: string = '';
  monogram: string = '';

  @Input()
  modifier: AvatarModifier = 'green';

  @Input()
  size: AvatarSize = 'medium';

  @Input()
  shape: AvatarShape = 'circle';

  @Input()
  set value(value: string) {
    this._value = value;
    this.monogram = this._value
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('');
  }

  @HostBinding('class')
  get classes(): string {
    return [
      this.getDefaultStyleClasses(),
      this.getAvatarShapeClass(this.shape),
      this.getBackgroundColorFromModifier(this.modifier),
    ].join(' ');
  }

  getDefaultStyleClasses(): string {
    const classes = [];
    switch (this.size) {
      case 'small':
        classes.push('h-8', 'w-8', 'text-sm');
        break;
      case 'medium':
        classes.push('h-10', 'w-10', 'text-base');
        break;
      case 'large':
        classes.push('h-12', 'w-12', 'text-lg');
        break;
      default:
        break;
    }
    classes.push('flex', 'items-center', 'justify-center', 'text-white');
    return classes.join(' ');
  }

  getAvatarShapeClass(shape: AvatarShape): string {
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

  getBackgroundColorFromModifier(modifier: AvatarModifier): string {
    switch (modifier) {
      case 'red':
        return 'bg-red-700';
      case 'orange':
        return 'bg-orange-700';
      case 'amber':
        return 'bg-amber-700';
      case 'yellow':
        return 'bg-yellow-700';
      case 'lime':
        return 'bg-lime-700';
      case 'green':
        return 'bg-green-700';
      case 'emerald':
        return 'bg-emerald-700';
      case 'teal':
        return 'bg-teal-700';
      case 'cyan':
        return 'bg-cyan-700';
      case 'sky':
        return 'bg-sky-700';
      case 'blue':
        return 'bg-blue-700';
      case 'indigo':
        return 'bg-indigo-700';
      case 'violet':
        return 'bg-violet-700';
      case 'purple':
        return 'bg-purple-700';
      case 'fuchsia':
        return 'bg-fuchsia-700';
      case 'pink':
        return 'bg-pink-700';
      case 'rose':
        return 'bg-rose-700';
      case 'slate':
        return 'bg-slate-700';
      case 'gray':
        return 'bg-gray-700';
      case 'zinc':
        return 'bg-zinc-700';
      case 'neutral':
        return 'bg-neutral-700';
      case 'stone':
        return 'bg-stone-700';
      default:
        return 'bg-gray-700';
    }
  }
}
