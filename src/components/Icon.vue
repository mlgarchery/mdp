<template>
    <img :src="name">
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="stylus" scoped>
img {
    padding: 10px;

  &.shown {
      filter: unset;
  }
}
</style>