<template>
  <div :class="[
    'mx-2 mt-2 bg-gray-800 shadow-md hover:shadow-lg hover:shadow-gray-700/50 hover:bg-gray-700 transition-all duration-300 p-4',
    roundedClass,
    customClass
  ]">
    <div class="hover:shadow-md hover:shadow-gray-700/30 transition-all duration-300">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseCard',
    props: {
      customClass: {
        type: String,
        default: ''
      },
      roundedClass: {
        type: String,
        default: 'rounded-sm'
      }
    }
  }
</script>

