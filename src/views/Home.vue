<template>
  <div class="home">
    <div class="home-inner">
      <ListView />
    </div>
  </div>
</template>

<script>
import ListView from "@/components/listView/ListView.vue";

export default {
  name: "Home",
  components: {
    ListView
  }
};
</script>

<style lang="less" scoped>
.home {
  padding: 0 80px;
  height: 100%;

  .home-inner {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    padding: 24px 30px;
    height: 100%;
    overflow: auto;
  }
}
</style>
