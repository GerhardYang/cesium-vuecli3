<template>
  <div id="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#222"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">
        <a href="#" target="_blank">订单管理</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      let viewer = this.$store.state.viewer;

      if (key == 1) {
        var promise = Cesium.GeoJsonDataSource.load(
          "http://support.supermap.com.cn:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/247.geojson",
          {
            clampToGround: true
          }
        );
        promise.then(function(dataSource) {
          viewer.dataSources.add(dataSource);
          let entities = dataSource.entities.values;
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var name = entity.name;

            entity.polygon.material = Cesium.Color.fromRandom({
              red: 1.0,
              green: 0,
              alpha: 0.7
            });
            entity.polygon.outline = false;
          }
        });
        viewer.flyTo(promise);
      }
    },
    query: function(sqlParam, url) {
      let viewer = this.$store.state.viewer;
      L.supermap
        .featureService(url)
        .getFeaturesBySQL(sqlParam, function(serviceResult) {
          let resultgeojson = serviceResult.result.features;
          console.log(resultgeojson);
          let viewPosition = viewer.dataSources.add(
            Cesium.GeoJsonDataSource.load("../../Apps/china.geojson", {
              stroke: Cesium.Color.BLACK,
              fill: Cesium.Color.RED,
              strokeWidth: 3,
              markerSymbol: "?"
            })
          );
          viewer.flyTo(viewPosition);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  background-color: black;
}
</style>
