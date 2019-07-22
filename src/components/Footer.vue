<template>
  <div id="footer">
    <div id="states">
      <span>经度：{{stateInfos.lng.toFixed(3)}}°</span>
      <span>纬度：{{stateInfos.lat.toFixed(3)}}°</span>
      <span>相机高度：{{stateInfos.height}}m</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stateInfos: {
        lng: null,
        lat: null,
        height: null
      }
    };
  },
  mounted() {
    let stateInfos = this.stateInfos;
    let viewer = this.$store.state.viewer;
    this.handleMOUSE_MOVE(stateInfos, viewer);
    this.handleWHEEL(stateInfos, viewer);
    // 镜头移动事件
    viewer.scene.camera.changed.addEventListener(function() {
      console.log(viewer.scene.camera.position);
      console.log(viewer.scene.camera.direction);
    });
  },
  methods: {
    handleMOUSE_MOVE: function(stateInfos, viewer) {
      // 定义当前场景的画布元素的事件处理
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
      handler.setInputAction(function(movement) {
        //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
        let cartesian = viewer.camera.pickEllipsoid(
          movement.endPosition,
          viewer.scene.globe.ellipsoid
        );
        console.log(cartesian);
        //将笛卡尔坐标转换为地理坐标
        let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(
          cartesian
        );
        //将弧度转为度的十进制度表示
        stateInfos.lng = Cesium.Math.toDegrees(cartographic.longitude);
        stateInfos.lat = Cesium.Math.toDegrees(cartographic.latitude);
        //获取相机高度
        stateInfos.height = Math.ceil(
          viewer.camera.positionCartographic.height
        );
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    handleWHEEL: function(stateInfos, viewer) {
      //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
      new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(
        function(wheelment) {
          stateInfos.height = Math.ceil(
            viewer.camera.positionCartographic.height
          );
        },
        Cesium.ScreenSpaceEventType.WHEEL
      );
    }
  }
};
</script>
<style scoped>
#footer {
  z-index: 999;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 40px;
  width: 100%;
  background: #040404;
  color: #fff;
  opacity: 0.8;
  border-top: 1px solid #fff;
}
#footer > #states {
  float: right;
  padding-right: 10px;
}
#footer > #states > span {
  line-height: 40px;
}
</style>