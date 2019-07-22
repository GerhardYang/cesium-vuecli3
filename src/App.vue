<template>
  <div>
    <Header />
    <Cesiumcontainer />
    <Footer />
  </div>
</template>


<script>
import Header from "./components/Header";
import Cesiumcontainer from "./components/Cesiumcontainer";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Cesiumcontainer,
    Footer
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
