<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: GerhardYang
 * @Date: 2019-08-29 20:07:55
 * @LastEditors: GerhardYang
 * @LastEditTime: 2019-08-29 20:54:00
 -->
<template>
  <div>
    <Header />
    <Cesiumcontainer />
    <Search />
    <Footer />
    <Leftmenu />
  </div>
</template>


<script>
import Header from "./components/Header";
import Cesiumcontainer from "./components/Cesiumcontainer";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Leftmenu from "./components/Leftmenu";

export default {
  components: {
    Header,
    Search,
    Cesiumcontainer,
    Footer,
    Leftmenu
  }
};
</script>
<style>
body,
html {
  margin: 0;
  padding: 0;
}
/* 屏蔽导航 */
.cesium-viewer-navigationContainer {
  display: none !important;
}
</style>
