<template>
  <span class="cell">
    {{ text }}
  </span>
</template>
<script lang="ts">
import { OperationType } from "@/models/Operation";
import { Vue, Component, Prop } from "vue-property-decorator";
import { TranslateResult } from "vue-i18n";

@Component
export default class ListCellOperationType extends Vue {
  @Prop({ type: Number })
  value!: OperationType | null;

  get valueAsString(): string | null {
    if (this.value === null || this.value === undefined) return null;

    return OperationType[this.value];
  }

  get text(): string | TranslateResult {
    const str = this.valueAsString;
    if (str === null) return "";

    return this.$t(str);
  }
}
</script>

<style lang="less" scoped>
.cell {
  font-size: 13px;
}
</style>
