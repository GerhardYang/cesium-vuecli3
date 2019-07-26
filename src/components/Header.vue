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
      <el-menu-item>
        <!-- <i class="el-icon-s-unfold"></i> -->
      </el-menu-item>
      <el-menu-item>
        <!-- <i class="el-icon-s-unfold"></i> -->
      </el-menu-item>
      <el-menu-item>
        <!-- <i class="el-icon-s-unfold"></i> -->
      </el-menu-item>
      <el-menu-item>
        <!-- <i class="el-icon-s-unfold"></i> -->
      </el-menu-item>
      <el-menu-item index="1">中国区划</el-menu-item>
      <el-submenu index="2">
        <template slot="title">三维模型</template>
        <el-menu-item index="2-1">鸟巢</el-menu-item>
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
      let widget = viewer.cesiumWidget;
      let scene = viewer.scene;

      if (key == 1) {
        let promise = Cesium.GeoJsonDataSource.load(
          "http://support.supermap.com.cn:8090/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features/247.geojson",
          {
            clampToGround: true
          }
        );
        promise.then(function(dataSource) {
          viewer.dataSources.add(dataSource);
          let entities = dataSource.entities.values;
          for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            let name = entity.name;

            // entity.polygon.fill = false;
            entity.polygon.outline = true;
            entity.polygon.outlineColor = Cesium.Color.RED;
            entity.polygon.outlineWidth = 300;
          }
        });
        viewer.flyTo(promise);
      }
      if (key == "2-1") {
        try {
          let niaochao = scene.open(
            "http://www.supermapol.com/realspace/services/3D-niaocao_water/rest/realspace",
            {
              clampToGround: true
            }
          );
          Cesium.when(
            niaochao,
            function(layers) {
              scene.camera.setView({
                destination: new Cesium.Cartesian3.fromDegrees(
                  116.38621009526075,
                  39.98468016277832,
                  313.2286367219722
                ),
                orientation: {
                  heading: 6.116051,
                  pitch: -0.275007,
                  roll: 6.283185
                }
              });
            },
            function() {
              let title =
                "加载SCP失败，请检查网络连接状态或者url地址是否正确？";
              widget.showErrorPanel(title, undefined, e);
            }
          );
        } catch (e) {
          if (widget._showRenderLoopErrors) {
            let title = "渲染时发生错误，已停止渲染。";
            widget.showErrorPanel(title, undefined, e);
          }
        }
      }
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
