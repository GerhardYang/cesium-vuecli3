<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors: GerhardYang
 * @LastEditTime: 2019-08-29 21:27:23
 -->
<template>
  <div id="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      menu-trigger="click"
      @open="handleSelect"
      @select="handleSelect"
      background-color="#222"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">区划查询</template>
        <el-submenu index="芙蓉区">
          <template slot="title">芙蓉区</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="天心区">
          <template slot="title">天心区</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="岳麓区">
          <template slot="title">岳麓区</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="开福区">
          <template slot="title">开福区</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="雨花区">
          <template slot="title">雨花区</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="长沙县">
          <template slot="title">长沙县</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="高新区">
          <template slot="title">高新区</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="望城区">
          <template slot="title">望城区</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="浏阳市">
          <template slot="title">浏阳市</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="宁乡市">
          <template slot="title">宁乡市</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">三维模型</template>
        <el-menu-item index="2-1">鸟巢</el-menu-item>
        <el-menu-item index="2-2">白模</el-menu-item>
        <el-menu-item index="2-3">倾斜摄影</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">热门地点</template>
        <el-menu-item index="3-1">五一广场</el-menu-item>
        <el-menu-item index="3-2">大学城</el-menu-item>
        <el-menu-item index="3-3">德思勤</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
      entity: null
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
      if (key == "2-2") {
        try {
          let baimo = scene.open(
            "http://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace",
            {
              clampToGround: true
            }
          );
          Cesium.when(
            baimo,
            function(layers) {
              scene.camera.setView({
                destination: new Cesium.Cartesian3(
                  -1570817.4642651612,
                  5319898.6362971235,
                  3151859.865965396
                ),
                orientation: {
                  heading: 2.7138026855834787,
                  pitch: -0.38919358992513686,
                  roll: 0.00007970940853230246
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
      if (key == "2-3") {
        try {
          let qingxie = scene.open(
            "http://www.supermapol.com/realspace/services/3D-dynamicDTH/rest/realspace",
            {
              clampToGround: true
            }
          );
          Cesium.when(
            qingxie,
            function(layers) {
              camera.setView({
                // 先定位，开始渲染定位区域的倾斜
                destination: new Cesium.Cartesian3(
                  -2623004.4174251584,
                  3926981.958360567,
                  4287374.829655093
                ),
                orientation: {
                  heading: 4.39611370540786,
                  pitch: -0.43458664812464143,
                  roll: 2.0174972803488345e-11
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
      if (key == "3-1") {
        this.entity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            112.9718016178242,
            28.19993838623157,
            82
          ),
          point: {
            color: Cesium.Color.RED, //点位颜色
            pixelSize: 10 //像素点大小
          },
          label: {
            text: "五一广场",
            font: "14pt Source Han Sans CN", //字体样式
            fillColor: Cesium.Color.BLACK, //字体颜色
            backgroundColor: Cesium.Color.AQUA, //背景颜色
            showBackground: true, //是否显示背景颜色
            style: Cesium.LabelStyle.FILL, //label样式
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
            pixelOffset: new Cesium.Cartesian2(10, 0) //偏移
          }
        });
        viewer.flyTo(this.entity, {
          offset: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            range: 3000
          }
        }); //居中到该点
      }
      if (key == "3-2") {
        this.entity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            112.94499421203213,
            28.15430307415972,
            82
          ),
          point: {
            color: Cesium.Color.RED, //点位颜色
            pixelSize: 10 //像素点大小
          },
          label: {
            text: "中南大学",
            font: "14pt Source Han Sans CN", //字体样式
            fillColor: Cesium.Color.BLACK, //字体颜色
            backgroundColor: Cesium.Color.AQUA, //背景颜色
            showBackground: true, //是否显示背景颜色
            style: Cesium.LabelStyle.FILL, //label样式
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
            pixelOffset: new Cesium.Cartesian2(10, 0) //偏移
          }
        });
        viewer.flyTo(this.entity, {
          offset: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            range: 3000
          }
        }); //居中到该点
      }
      if (key == "3-3") {
        this.entity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            113.0056867834493,
            28.115003235498907,
            82
          ),
          point: {
            color: Cesium.Color.RED, //点位颜色
            pixelSize: 10 //像素点大小
          },
          label: {
            text: "德思勤",
            font: "14pt Source Han Sans CN", //字体样式
            fillColor: Cesium.Color.BLACK, //字体颜色
            backgroundColor: Cesium.Color.AQUA, //背景颜色
            showBackground: true, //是否显示背景颜色
            style: Cesium.LabelStyle.FILL, //label样式
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
            pixelOffset: new Cesium.Cartesian2(10, 0) //偏移
          }
        });
        viewer.flyTo(this.entity, {
          offset: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            range: 3000
          }
        }); //居中到该点
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
