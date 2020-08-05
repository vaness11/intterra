<template>
  <div>
    <h1>Операции на поле</h1>
    <ModeSelector :mode="mode" @modeChanged="newMode => (mode = newMode)" />
    <ListTable :operations="operations" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ModeSelector from "./ModeSelector.vue";
import ListTable from "./ListTable.vue";
import { ListViewMode } from "../../models/ListViewMode";
import FieldService from "../../services/fieldService";
import Operation from "../../models/Operation";

@Component({ components: { ModeSelector, ListTable } })
export default class ListView extends Vue {
  mode = ListViewMode.Planned;
  service = new FieldService();
  operations: Operation[] = [];

  @Watch("mode", { immediate: true })
  async onModeChanged(value: ListViewMode) {
    const today = new Date();
    this.operations = Object.freeze(await this.service.getOperations()).filter(
      x => {
        const date = new Date(x.date.year, x.date.month - 1, x.date.day);
        if (value == ListViewMode.Planned) return today <= date;
        return today > date;
      }
    );
  }
}
</script>
