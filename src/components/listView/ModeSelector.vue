<template>
  <div class="selections">
    <a
      :class="{ selected: mode == listModes.Planned }"
      @click="onClick(listModes.Planned)"
    >
      Запланированные операции
    </a>
    <a
      :class="{ selected: mode == listModes.Completed }"
      @click="onClick(listModes.Completed)"
    >
      Выполненные операции
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ListViewMode } from "@/models/ListViewModels";
@Component
export default class ModeSelector extends Vue {
  @Prop({ type: Number, required: true })
  mode!: ListViewMode;

  listModes = ListViewMode;

  onClick(mode: ListViewMode) {
    this.$emit("modeChanged", mode);
  }
}
</script>
<style lang="less" scoped>
.selections {
  line-height: 40px;

  a {
    text-transform: uppercase;
    cursor: pointer;
    padding: 0 9px;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;

    &:first-of-type {
      padding-left: 0;
    }
    &:last-of-type {
      padding-right: 0;
    }

    &:not(.selected) {
      color: #3399ff;
    }
  }
}
</style>
