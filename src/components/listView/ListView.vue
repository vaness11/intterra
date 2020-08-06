<template>
  <div>
    <h1>Операции на поле</h1>
    <ModeSelector :mode="mode" @modeChanged="newMode => (mode = newMode)" />
    <Loader v-if="loading" />
    <ListTable v-else :operations="operations" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Loader from "@/components/Loader.vue";
import ModeSelector from "./ModeSelector.vue";
import ListTable from "./ListTable.vue";
import { ListViewMode, ListViewColumn } from "@/models/ListViewModels";
import ListViewService from "@/services/listViewService";
import FieldService from "@/services/fieldService";
import Operation from "@/models/Operation";

@Component({ components: { ModeSelector, ListTable, Loader } })
export default class ListView extends Vue {
  mode = ListViewMode.Planned;
  loading = false;
  fieldService = new FieldService();
  listViewService = new ListViewService();
  operations: Operation[] = [];
  columns: ListViewColumn[] = [];

  @Watch("mode", { immediate: true })
  async onModeChanged(value: ListViewMode) {
    this.loading = true;
    await this.delay(200); // имитация загрузки...
    this.columns = await this.listViewService.getColumns();
    await this.delay(300); // имитация загрузки...
    const today = new Date();
    this.operations = Object.freeze(
      await this.fieldService.getOperations()
    ).filter(x => {
      const date = new Date(x.date.year, x.date.month - 1, x.date.day);
      if (value == ListViewMode.Planned) return today <= date;
      return today > date;
    });
    this.loading = false;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
</script>
