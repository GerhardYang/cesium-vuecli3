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
      let viewer = new Cesium.Viewer("container");
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
