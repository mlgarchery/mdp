<template>
<div class="icon_wrapper">
    <Icon :name="name"></Icon>
    <slot />
</div>
</template>
<script >
import Icon from './Icon';

export default {
    components: {
        Icon
    },
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
.icon_wrapper {
    display: flex;
}
</style>