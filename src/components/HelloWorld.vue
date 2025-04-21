<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      msg: 'Hello World !!' 
    }
  },
  methods: {
    sayHello() {
      this.msg = 'Hello World !!'
    }
  }
})
</script>

<style scoped>

</style>