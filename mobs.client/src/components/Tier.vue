<template>
  <div class="tier" @click="createSupport">
    <div>
      <h6>{{ tier.name }}</h6>
      <h5>${{ tier.cost }}</h5>
    </div>
    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi laborum minima maxime nobis reiciendis
      recusandae consequuntur. </p>
    <button v-if="tier.creatorId == account.id" @click.stop="deleteTier">
      <i class="mdi mdi-close"></i>
    </button>
  </div>
</template>


<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { supportsService } from '../services/SupportsService.js'
import { tiersService } from "../services/TiersService"
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: { tier: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()


    const hasTier = computed(() => AppState.supportedProjects.find(p => p.tierId == props.tier.id))
    return {
      hasTier,
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
      },
      async createSupport() {
        try {
          if (!AppState.account.id) {
            Pop.toast('You must Login to Support this Project', 'info')
            return
          }
          const support = AppState.supportedProjects.find(s => s.projectId == route.params.id)
          // is this a change
          if (hasTier.value) {
            Pop.toast("You already back at this tier")
          } else if (support) {
            // confirm the change
            if (await Pop.confirm("Change Support", 'Are you sure you want to change your support of this project?', 'question', 'confirm')) {
              // hacky fun
              support.tierId = props.tier.id
              support.tier = props.tier
              await supportsService.updateTier(support)
              Pop.toast('Updated support tier')
            }
          } else {
            const support = { tierId: props.tier.id, projectId: route.params.id }
            await supportsService.createSupport(support)
            Pop.toast('Thanks for supporting', 'success')
          }
        } catch (error) {
          Pop.toast("Something went wrong", 'error')
          logger.error(error)
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/_tier.scss";
</style>
