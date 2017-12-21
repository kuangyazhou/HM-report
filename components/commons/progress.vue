<template>
  <div class="progress-outer" :style="{width:width+'px',background:outerBackground}">
    <div class="progress-inner" :style="{width:percentage+'%',background:innerBackground}">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 50
    },
    width: {
      type: Number,
      default: 100
    },
    outerBackground: {
      type: String,
      default: "#1d4e7f"
    },
    innerBackground: {
      type: String,
      default: "linear-gradient(to right, #285ab2, #c26ccc)"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.progress-outer {
  display: inline-block;
  /* width: 100px; */
  height: 18px;
  border-radius: 9px;
  background: red;
}
.progress-inner {
  height: 100%;
  max-width: 100%;
  border-radius: 9px;
  background-color: cyan;
}
</style>
