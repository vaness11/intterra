<template>
  <span class="cell" :class="cellClass">
    <span class="cell-icon"></span>
    <span class="cell-text">
      {{ text }}
    </span>
  </span>
</template>
<script lang="ts">
import { Assessment } from "@/models/Operation";
import { Vue, Component, Prop } from "vue-property-decorator";
import { TranslateResult } from "vue-i18n";

@Component
export default class ListCellAssessment extends Vue {
  @Prop({ type: Number })
  value!: Assessment | null;

  get valueAsString(): string | null {
    if (this.value === null || this.value === undefined) return null;

    return Assessment[this.value];
  }

  get text(): string | TranslateResult {
    const str = this.valueAsString;
    if (str === null) return "Нет оценки";

    return this.$t(str);
  }

  get cellClass(): string {
    const str = this.valueAsString;
    if (str === null) return "no-value";

    return str.toLowerCase();
  }
}
</script>

<style lang="less" scoped>
.cell {
  .cell-icon {
    display: inline-block;
    content: " ";
    background: #edeeee;
    border-radius: 5px;
    width: 20px;
    height: 10px;
  }

  &.no-value .cell-text {
    opacity: 0.3;
  }

  &.excellent .cell-icon {
    background: #66cc66;
  }

  &.satisfactorily .cell-icon {
    background: #ffe06d;
  }

  &.badly .cell-icon {
    background: #ff7360;
  }
}
</style>
