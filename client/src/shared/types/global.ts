import {
  UseSortByColumnProps,
  UseFiltersColumnProps,
  UseSortByOptions,
} from 'react-table'

declare module 'react-table' {
  export interface TableOptions<D extends object>
    extends UseExpandedOptions<D>,
    UseSortByOptions<D> { }

  export interface ColumnInstance<D extends object = {}> extends UseFiltersColumnProps<D>,
    UseSortByColumnProps<D> { }
}