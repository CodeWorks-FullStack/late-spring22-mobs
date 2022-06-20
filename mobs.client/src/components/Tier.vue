<template>
  <div class="tier">
    <div>
      <h6>{{ tier.name }}</h6>
      <h5>${{ tier.cost }}</h5>
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi
      laborum minima maxime nobis reiciendis recusandae consequuntur.
    </p>
    <button v-if="tier.creatorId == account.id" @click.stop="deleteTier">
      <i class="mdi mdi-close"></i>
    </button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { tiersService } from "../services/TiersService";
import { logger } from '../utils/Logger';
export default {
  props: { tier: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async deleteTier() {
        try {
          if (await Pop.confirm()) {
            await tiersService.deleteTier(props.tier.id)
          }
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_tier.scss";
</style>
