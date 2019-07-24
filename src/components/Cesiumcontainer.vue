<template>
  <div>
    <div id="container" />
    <Footer />
  </div>
</template>

<script>
export default {
  mounted() {
    this.initViewer();
  },
  methods: {
    initViewer: function() {
      //初始化场景
      const google = new Cesium.UrlTemplateImageryProvider({
        url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}"
      });

      //加载影像注记
      const tdtcia = new Cesium.WebMapTileServiceImageryProvider({
        url:
          "http://t0.tianditu.gov.cn/cia_w/wmts?tk=c3eec6ca025f3324e22a47545b25c6c8",
        layer: "cia",
        style: "default",
        tileMatrixSetID: "w",
        format: "tiles",
        maximumLevel: 18
      });

      const mapbox = new Cesium.UrlTemplateImageryProvider({
        url:
          "https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
      });

      const geoq = new Cesium.ArcGisMapServerImageryProvider({
        url:
          "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        enablePickFeatures: false
      });

      const esriIMG = new Cesium.ArcGisMapServerImageryProvider({
        url:
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        enablePickFeatures: false
      });
      const SKT = new Cesium.CesiumTerrainProvider({
        url:
          "https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path",
        requestWaterMask: true,
        requestVertexNormals: true
      });
      let viewer = new Cesium.Viewer("container", {
        //创建地形服务提供者的实例，url为SuperMap iServer发布的TIN地形服务
        terrainProvider: SKT,
        //添加影像服务
        imageryProvider: google
      });
      viewer.imageryLayers.addImageryProvider(google);
      viewer.imageryLayers.addImageryProvider(tdtcia);

      this.$store.commit("changeViewer", viewer);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
