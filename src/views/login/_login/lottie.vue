<template>
  <div :style="style" ref="lavContainer"></div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: Number,
    width: Number,
  },

  data() {
    return {
      style: {
        width: this.width ? `${this.width}%` : '100%',
        height: this.height ? `${this.height}%` : '100%',
      },
    };
  },

  async mounted() {
    const lottie = await import(/* webpackChunkName: "lottie" */ 'lottie-web');
    this.anim = lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: 'svg',
      ...this.options,
    });
    this.$emit('animCreated', this.anim);
  },
  destroyed() {
    this.anim.destroy();
  },
};
</script>
