<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors: GerhardYang
 * @LastEditTime: 2019-08-29 20:19:57
 -->
<template>
  <div id="search">
    <el-autocomplete
      v-model="state"
      clearable
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入定位地点"
      :trigger-on-focus="false"
      @select="handleSelect"
      class="searchinput"
      popper-class="searchpanel"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <template slot-scope="{ item }">
        <div class="name">{{item.name}}</div>
        <span class="addr">地址:{{item.address}},经纬度:{{item.location}}</span>
      </template>
    </el-autocomplete>
  </div>
</template>
<script>
import Vue from "vue";
import Convertcoordinates from "../assets/js/Convertcoordinates";
export default {
  data() {
    return {
      apidata: [],
      state: "",
      entity: null
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      let url = `https://restapi.amap.com/v3/place/text`;
      if (queryString && queryString != "" && queryString != " ") {
        Vue.axios
          .get(url, {
            params: {
              keywords: queryString,
              key: "29027b0410e8cd66c1797081f0443deb"
            }
          })
          .then(res => {
            // console.log(res);
            this.apidata = res.data.pois;
            let apidata = this.apidata;
            let results = queryString
              ? apidata.filter(this.createFilter(queryString))
              : apidata;
            // 调用 callback 返回建议列表的数据
            cb(results);
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    createFilter(queryString) {
      return state => {
        return (
          state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.state = item.name;

      let viewer = this.$store.state.viewer;

      let gcj02lonlat = item.location.split(",");

      let wgs84lonlat = Convertcoordinates.gcj02towgs84(
        parseFloat(gcj02lonlat[0]),
        parseFloat(gcj02lonlat[1])
      );

      //x为longtitude,y为latitude,terrain是地形privider
      // let positions = [
      //   Cesium.Cartographic.fromDegrees(wgs84lonlat[0], wgs84lonlat[1])
      // ];
      // let promise = Cesium.sampleTerrainMostDetailed(
      //   viewer.terrainProvider,
      //   positions
      // );
      // Cesium.when(promise, updatedPositions => {
      //   let terrainHeight = updatedPositions[0].height;
      //   console.log(positions, terrainHeight);

      if (this.entity != null) {
        viewer.entities.remove(this.entity);
      }
      this.entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          wgs84lonlat[0],
          wgs84lonlat[1],
          12
        ),
        point: {
          color: Cesium.Color.RED, //点位颜色
          pixelSize: 10 //像素点大小
        },
        label: {
          text: item.name,
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
      //   });
    }
  },
  mounted() {}
};
</script>
<style>
.name {
  line-height: 20px;
}
.addr {
  font-size: 6px;
  line-height: 8px;
  color: #999;
}
#search {
  width: 400px;
  margin-top: 15px;
  margin-left: 15px;
}
.searchpanel {
  background: transparent !important;
  border: none !important;
}
.searchpanel
  > div.el-scrollbar
  > div.el-autocomplete-suggestion__wrap
  > ul.el-autocomplete-suggestion__list
  > li {
  color: #ccc;
  border-bottom: 1px solid #666;
}
.searchpanel > div.el-scrollbar > div.el-autocomplete-suggestion__wrap {
  max-height: 400px;
}
.searchpanel
  > div.el-scrollbar
  > div.el-autocomplete-suggestion__wrap
  > ul.el-autocomplete-suggestion__list
  > li:hover {
  background-color: #409eff99;
}
.searchpanel > .el-scrollbar {
  background-color: #000000aa;
  border: 1px solid #409eff;
  border-radius: 5px;
}
.searchpanel > .popper__arrow {
  color: #000000aa;
}

/* 覆盖搜索框默认样式 */
.searchinput > div > input.el-input__inner {
  background-color: #000000aa;
}
.searchinput > div > input.el-input__inner,
i.el-icon-search {
  color: #409eff;
  font-weight: 500;
}
</style>


