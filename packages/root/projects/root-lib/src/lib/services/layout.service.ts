import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  RootBreakpoint,
  RootBreakpointMediaQueries,
} from '../model/breakpoints.type';

@Injectable({
  providedIn: 'root',
})
export class RootLayoutService {
  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  get rootBreakpoint(): RootBreakpoint {
    const breakpoints = Object.keys(
      RootBreakpointMediaQueries,
    ) as RootBreakpoint[];
    const activeBreakpoints = breakpoints.find((breakpoint) =>
      this.breakpointObserver.isMatched(RootBreakpointMediaQueries[breakpoint]),
    );
    return activeBreakpoints || 'xs';
  }
}
