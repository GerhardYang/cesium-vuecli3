<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>-->
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
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">区划定位</span>
        </template>
        <el-menu-item-group>
          <el-submenu index="1-1">
            <span slot="title">湖北省</span>
            <el-menu-item index="1-1-1">武汉市</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <span slot="title">湖南省</span>
            <el-menu-item index="1-2-1">长沙市</el-menu-item>
          </el-submenu>
        </el-menu-item-group>
        <el-submenu index="1-3">
          <span slot="title">江西省</span>
          <el-menu-item index="1-3-1">南昌市</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
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
    }
  }
};
</script>
<style>
.el-menu-vertical-left {
  margin-top: 30px !important;
  border-right: none !important;
}
</style>


