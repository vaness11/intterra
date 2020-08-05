<template>
  <span>
    {{ value }}
  </span>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class ListCellText extends Vue {
  @Prop({ type: String })
  value!: string | null;
}
</script>
