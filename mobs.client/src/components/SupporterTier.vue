<template>
  <div class="supporter-tier">
    <h5>{{ tier.name }}</h5>
    <div v-for="s in supporters" :key="s.id">
      <img :src="s.account?.picture" alt="" />
      <p>{{ s.account?.name }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  props: { tier: { type: Object, required: true } },
  setup(props) {
    return {
      supporters: computed(() => AppState.supporters.filter(s => s.tierId == props.tier.id))
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.supporter-tier {
  margin-bottom: 2em;

  h5 {
    @include baloo(700);
    font-size: 20;
    color: $info;
    padding: 0.25em;
    border-bottom: 1px solid darken($light, 30);
    margin-bottom: 1em;
  }

  &>div {
    display: flex;
    align-items: center;
    margin-bottom: 0.75em;

    img {
      width: 3em;
      box-shadow: 0px 2px 4px rgba(20, 20, 20, 0.219);
      border-radius: 50em;
      outline: 1px solid lighten($dark, 60);
      margin-right: 0.5em;
    }

    p {
      font-weight: 500;
      margin: 0;
    }
  }
}
</style>
