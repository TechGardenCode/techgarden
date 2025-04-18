import { Component, Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[rootInput]',
})
export class RootInput {
  @HostBinding('class')
  get classes(): string {
    return [
      'rounded-full',
      'py-2',
      'px-5',
      'bg-zinc-300',
      'dark:bg-zinc-700',
      'text-zinc-700',
      'dark:text-zinc-300',
    ].join(' ');
  }
}
