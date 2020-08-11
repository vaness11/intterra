import Operation from "./Operation";

export enum ListViewMode {
  Planned = 0,
  Completed = 1
}

export enum ListSort {
  None = 0,
  Asc = 1,
  Desc = -1
}

export interface ListViewColumn {
  propertyName: keyof Operation;
  text: string;
  sortFunc: (a: Operation, b: Operation) => number;
}

export interface ListViewSortableColumn extends ListViewColumn {
  sort: ListSort;
}
