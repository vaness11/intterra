<template>
  <table class="list-table">
    <thead>
      <th
        v-for="column in columns"
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
          v-for="column in columns"
          :key="operation.id + '_' + column.propertyName"
        >
          <component
            :is="column.component"
            :value="operation[column.propertyName]"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Operation from "@/models/Operation";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import ListCellText from "./cells/ListCellText.vue";
import ListCellDate from "./cells/ListCellDate.vue";
import ListCellAssessment from "./cells/ListCellAssessment.vue";
import ListCellOperationType from "./cells/ListCellOperationType.vue";

enum ListSort {
  None = 0,
  Asc = 1,
  Desc = -1
}

interface ListViewColumn {
  propertyName: keyof Operation;
  text: string;
  component: unknown;
  sort: ListSort;
  sortFunc: (a: Operation, b: Operation) => number;
}

@Component
export default class ListTable extends Vue {
  columns: ListViewColumn[] = [
    {
      propertyName: "date",
      text: "Дата",
      component: ListCellDate,
      sort: ListSort.None,
      sortFunc(a, b) {
        const x = a.date
          ? new Date(a.date.year, a.date.month - 1, a.date.day)
          : 0;
        const y = b.date
          ? new Date(b.date.year, b.date.month - 1, b.date.day)
          : 0;
        return x < y ? -1 : x > y ? 1 : 0;
      }
    },
    {
      propertyName: "type",
      text: "Операция",
      component: ListCellOperationType,
      sort: ListSort.None,
      sortFunc(a, b) {
        return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
      }
    },
    {
      propertyName: "assessment",
      text: "Качество",
      component: ListCellAssessment,
      sort: ListSort.None,
      sortFunc(a, b) {
        const x = a.assessment ?? 99;
        const y = b.assessment ?? 99;
        return x < y ? -1 : x > y ? 1 : 0;
      }
    },
    {
      propertyName: "comment",
      text: "Комментарий",
      component: ListCellText,
      sort: ListSort.None,
      sortFunc(a, b) {
        const x = (a.comment || "").toLowerCase();
        const y = (b.comment || "").toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
    }
  ];

  @Prop({ type: Array, required: true })
  operations!: Operation[];

  get sortedOperations(): Operation[] {
    if (!this.operations || !this.operations.length) return [];

    const ops = this.operations.slice(0); // copy
    const column = this.columns.find(x => x.sort !== ListSort.None);
    if (column) ops.sort((a, b) => column.sortFunc(a, b) * column.sort);

    return ops;
  }

  @Watch("operations")
  onOperationsChange() {
    this.resetSort();
  }

  getSortClass(col: ListViewColumn) {
    return "sort-" + ListSort[col.sort].toLowerCase();
  }

  changeSort(col: ListViewColumn) {
    let sort = col.sort + 1;
    if (sort > ListSort.Asc) sort = ListSort.Desc;

    this.resetSort();

    col.sort = sort;
  }

  resetSort() {
    this.columns.forEach(x => (x.sort = ListSort.None));
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
