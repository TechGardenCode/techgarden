import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'root-shimmer',
  imports: [CommonModule],
  templateUrl: './shimmer.component.html',
  styleUrl: './shimmer.component.css',
  host: {
    class: 'animate-pulse flex flex-col',
    role: 'status',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootShimmer {
  @Input() widthClass: string = 'w-full';
  @Input() heightClass: string = 'h-4';
  @Input() borderRadiusClass: string = 'rounded-md';
  @Input() backgroundColorClass: string = 'bg-zinc-200 dark:bg-zinc-800';
  @Input({ transform: (v: string) => parseInt(v) }) rows: number = 1;
  @Input({ transform: (v: string) => parseInt(v) }) cols: number = 1;
  @HostBinding('class')
  @Input()
  gap: string = 'gap-2';
}
