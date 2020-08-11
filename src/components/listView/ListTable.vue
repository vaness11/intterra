<template>
  <table class="list-table">
    <thead>
      <th
        v-for="column in sortableColumns"
        :key="column.propertyName"
        :class="getSortClass(column)"
        @click="changeSort(column)"
      >
        {{ column.text }}
      </th>
    </thead>
    <tbody>
      <tr v-for="operation in sortedOperations" :key="operation.id">
        <td
          v-for="column in sortableColumns"
          :key="operation.id + '_' + column.propertyName"
        >
          <component
            :is="getComponent(column.propertyName)"
            :value="operation[column.propertyName]"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Operation from "@/models/Operation";
import {
  ListSort,
  ListViewColumn,
  ListViewSortableColumn
} from "@/models/ListViewModels";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import ListCellText from "./cells/ListCellText.vue";
import ListCellDate from "./cells/ListCellDate.vue";
import ListCellAssessment from "./cells/ListCellAssessment.vue";
import ListCellOperationType from "./cells/ListCellOperationType.vue";

@Component
export default class ListTable extends Vue {
  @Prop({ type: Array, required: true })
  columns!: ListViewColumn[];

  sortableColumns: ListViewSortableColumn[] = [];

  @Prop({ type: Array, required: true })
  operations!: Operation[];

  get sortedOperations(): Operation[] {
    if (!this.operations || !this.operations.length) return [];

    const ops = this.operations.slice(0); // copy
    const column = this.sortableColumns.find(x => x.sort !== ListSort.None);
    if (column) ops.sort((a, b) => column.sortFunc(a, b) * column.sort);

    return ops;
  }

  @Watch("columns", { immediate: true })
  onColumnsChange(value: ListViewColumn[]) {
    if (!value || !value.length) return;

    // or using Object.assign({ sort: ListSort.None, ...x })
    this.sortableColumns = value.map(x => ({
      propertyName: x.propertyName,
      text: x.text,
      sortFunc: x.sortFunc,
      sort: ListSort.None
    }));
  }

  @Watch("operations")
  onOperationsChange() {
    this.resetSort();
  }

  getComponent(propertyName: keyof Operation) {
    switch (propertyName) {
      case "type":
        return ListCellOperationType;
      case "date":
        return ListCellDate;
      case "assessment":
        return ListCellAssessment;
      default:
        return ListCellText;
    }
  }

  getSortClass(col: ListViewSortableColumn) {
    return "sort-" + ListSort[col.sort].toLowerCase();
  }

  changeSort(col: ListViewSortableColumn) {
    let sort = col.sort + 1;
    if (sort > ListSort.Asc) sort = ListSort.Desc;

    this.resetSort();

    col.sort = sort;
  }

  resetSort() {
    this.sortableColumns.forEach(x => (x.sort = ListSort.None));
  }
}
</script>

<style lang="less" scoped>
.list-table {
  width: 100%;

  th,
  td {
    text-align: left;
    height: 40px;
    vertical-align: middle;
    padding: 9px;
    font-size: 11px;
  }

  th {
    background: #edeeee;
    font-weight: 500;
    cursor: pointer;
    user-select: none;

    &::after {
      content: "";
      height: 5px;
      width: 10px;
    }

    &.sort-asc::after {
      content: "⏷";
    }
    &.sort-desc::after {
      content: "⏶";
    }
  }
}
</style>
