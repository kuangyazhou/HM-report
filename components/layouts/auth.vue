<template>
  <div class="hm-protal-container">
    <div class="main-cnt">
      <div class="auth-page-container">
        <nuxt/>
      </div>
      <HMFooter/>
    </div>
  </div>
</template>

<script>
  import HMFooter from '~components/Footer.vue'

  export default {
    components: {
      HMFooter
    }
  }
</script>

<style></style>
