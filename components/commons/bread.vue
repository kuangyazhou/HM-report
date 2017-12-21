<template>
  <div class="bread-component">
    <span v-for="(item,index) in options"  v-bind:key="index">
      <span @click="itemClcik(item,index)" class="bread-item">{{item.label}}</span>
      <span v-if="index+1<options.length">{{symbol}}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    symbol:{
      type:String,
      default:'/'
    }
  },
  data() {
    return {
      current: 100
    };
  },
  methods: {
    itemClcik(e, i) {
      // console.log(e);
      this.options.splice(i+1,this.options.length);
      this.$emit('breadClick',e);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bread-component {
  display: inline-block;
  padding: 4px 6px;
}
.bread-item {
  display: inline-block;
  margin: 6px;
  transition: all 0.2s ease-in-out;
}
.bread-item:hover {
  cursor: pointer;
  color: #8fbaff;
  transform: scale(1.1);
  transition: all 0.4s ease-in-out;
}
</style>
