<template>
  <div>
    <Header />
    <Cesiumcontainer />
    <Footer />
    <Leftmenu />
  </div>
</template>


<script>
import Header from "./components/Header";
import Cesiumcontainer from "./components/Cesiumcontainer";
import Footer from "./components/Footer";
import Leftmenu from "./components/Leftmenu";

export default {
  components: {
    Header,
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
</style>
