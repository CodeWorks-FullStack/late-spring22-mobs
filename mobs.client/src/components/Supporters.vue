<template>
  <div class="supporters">
    <!-- Button -->
    <button data-bs-toggle="offcanvas" data-bs-target="#supporters-canvas"> see supporters </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="supporters-canvas" aria-labelledby="offcanvasLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Supporters</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <SupporterTier v-for="t in tiers" :key="t.id" :tier="t" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { supportsService } from '../services/SupportsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await supportsService.getSupportsByProject(route.params.id)
      } catch (error) {
        Pop.error(error)
      }
    })
    return {
      tiers: computed(() => AppState.tiers)
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.supporters {
  margin: auto 0em 1em auto;

  &>button {
    border: 0;
    border-radius: 8px;
    padding: 1em 3em;
    background: $success;
    color: lighten($light, 10);
    transition: all 0.1s ease;
    @include bigShadow($success, 0.5);
    @include selectable();
  }

  .offcanvas {
    background: lighten($light, 7);
    background-image: url("../assets/img/MobsBlob.png");
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: top right;
    width: 28em;
    padding-left: 1em;
    padding-right: 1em;

    &-header {
      direction: rtl;

      button {
        background: transparent;
        color: $dark  !important;
      }
    }

    &-body {
      background: lighten($light, 20);
      color: $dark;
      border-radius: 6px;
      box-shadow: 0px 2px 4px rgba(21, 21, 21, 0.247);
    }
  }
}
</style>
