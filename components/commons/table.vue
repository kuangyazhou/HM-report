<template>
  <div class="v-table">
    <div class="v-title">
      <span class="title-ceil" v-for="item in title" v-bind:key="item.index">{{item}}</span>
    </div>
    <div class="v-content" v-for="(e,index) in tableData" v-bind:key="e.index" :class="{active:activeLine==index+1}">
      <span class="content-ceil" v-for="(ceil,index) in e" v-bind:key="ceil.index" :class="{active:activeRow==index+1}">{{ceil}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      // default:
      default: () => {
        return ["项目", "今日", "昨日", "最近7日", "上月同期"];
      }
    },
    tableData: {
      type: Array,
      // default: [
      //   ["销售额", "3486", "32495", "36241", "31265"],
      //   ["销售额", "3486", "32495", "36241", "31265"],
      //   ["销售额", "3486", "32495", "36241", "31265"],
      //   ["销售额", "3486", "32495", "3624", "31265"],
      //   ["销售额", "3486", "32495", "36241", "31265"]
      // ]
      default: () => {
        return [
          ["销售额", "3486", "32495", "36241", "31265"],
          ["销售额", "3486", "32495", "36241", "31265"],
          ["销售额", "3486", "32495", "36241", "31265"],
          ["销售额", "3486", "32495", "3624", "31265"],
          ["销售额", "3486", "32495", "36241", "31265"]
        ];
      }
    },
    activeLine: {
      type: Number,
      default: 0
    },
    activeRow: {
      type: Number,
      default: 0
    },
    showIndex: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    tableData: function(val) {
      this.tableData = val;
    }
  },
  data() {
    return {
      // title: ,
      // tableData:
    };
  },
  created() {
    if (this.showIndex) {
      this.title.unshift("排行");
      this.tableData.forEach((e, i) => {
        e.unshift(i + 1);
      });
    }
  },
  computed: {},
  methods: {},
  mounted() {
    // this.showIndex ? this.title.unshift("排行") : "";
  }
};
</script>

<style scoped>
.v-table {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  background: transparent;
  color: #e5e5e5;
  font-size: 0.8em;
}
.active {
  /* font-size: 0.8em; */
  color: #4aedca;
}
.title-ceil,
.content-ceil {
  /* display: inline-block; */
  display: flex;
  width: 80px;
  padding: 4px;
}
.v-title {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.title-ceil,
.content-ceil {
  justify-content: center;
}
.v-title .title-ceil:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.v-content {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.v-content .content-ceil:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
.v-table .v-content:last-child {
  border: none;
}
</style>
