<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors: GerhardYang
 * @LastEditTime: 2019-08-29 23:47:58
 -->
<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-left"
      background-color="#04040488"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      @select="handelSelect"
      :collapse="isCollapse"
    >
      <el-menu-item index="1">
        <i class="el-icon-delete"></i>
        <span slot="title">清除</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-location"></i>
        <span slot="title">定位</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-info"></i>
        <span slot="title">详情</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import Convertcoordinates from "../assets/js/Convertcoordinates";
import path from "../assets/js/path";
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handelSelect(key, keyPath) {
      console.log(key, keyPath);
      if ((key = 2)) {
        let viewer = this.$store.state.viewer;

        for (let index = 0; index < path.length; index++) {
          let wgs84lonlat = Convertcoordinates.gcj02towgs84(
            parseFloat(path[index][0]),
            parseFloat(path[index][1])
          );

          if (path[index] && path[index + 1]) {
            let wgs84lonlat2 = Convertcoordinates.gcj02towgs84(
              parseFloat(path[index + 1][0]),
              parseFloat(path[index + 1][1])
            );
            console.log(index);
            // console.log(wgs84lonlat2);
            let randomHeight = 50.0 + Math.random() * 50;
            viewer.entities.add({
              name: "Blue extruded corridor with beveled corners and outline",
              corridor: {
                positions: Cesium.Cartesian3.fromDegreesArray([
                  wgs84lonlat[0],
                  wgs84lonlat[1],
                  wgs84lonlat2[0],
                  wgs84lonlat2[1]
                ]),
                height: 10,
                extrudedHeight: randomHeight,
                width: 10.0,
                cornerType: Cesium.CornerType.BEVELED,
                material: this.getColor(randomHeight),
                outline: true,
                outlineColor: Cesium.Color.WHITE
              }
            });
          }
        }

        viewer.zoomTo(viewer.entities);
      }
    },
    getColor: function(height) {
      let color = null;
      if (height >= 90) {
        color = Cesium.Color.RED.withAlpha(0.5);
      } else if (height >= 80) {
        color = Cesium.Color.ORANGERED.withAlpha(0.5);
      } else if (height >= 70) {
        color = Cesium.Color.YELLOW.withAlpha(0.5);
      } else if (height >= 60) {
        color = Cesium.Color.GREENYELLOW.withAlpha(0.5);
      } else if (height >= 50) {
        color = Cesium.Color.GREEN.withAlpha(0.5);
      }
      return color;
    }
  }
};
</script>
<style>
.el-menu-vertical-left {
  margin-top: 130px !important;
  border-right: none !important;
}
</style>


