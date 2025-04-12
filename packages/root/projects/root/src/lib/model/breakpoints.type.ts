export const RootBreakpointMediaQueries = {
  xs: '(max-width: 639.98px)',
  sm: '(min-width: 640px) and (max-width: 767.98px)',
  md: '(min-width: 768px) and (max-width: 1023.98px)',
  lg: '(min-width: 1024px) and (max-width: 1279.98px)',
  xl: '(min-width: 1280px) and (max-width: 1535.98px)',
  '2xl': '(min-width: 1536px)',
};

export type RootBreakpoint = keyof typeof RootBreakpointMediaQueries;
export type RootBreakpointMediaQuery =
  (typeof RootBreakpointMediaQueries)[RootBreakpoint];
