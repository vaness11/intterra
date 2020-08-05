<template>
  <span class="cell">
    {{ date }}
  </span>
</template>
<script lang="ts">
import TDate from "@/models/TDate";
import { Vue, Component, Prop } from "vue-property-decorator";

const monthNames = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек"
];
@Component
export default class ListCellDate extends Vue {
  @Prop({ type: Object })
  value!: TDate | null;

  get date(): string {
    if (!this.value) return "";

    // eslint-disable-next-line prettier/prettier
    return `${this.value.day} ${monthNames[this.value.month-1]} ${this.value.year}`;
  }
}
</script>
<style lang="less" scoped>
.cell {
  text-transform: uppercase;
}
</style>
