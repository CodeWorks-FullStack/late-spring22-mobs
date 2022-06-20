<template>
  <form id="project-form" @submit.prevent="createTier">
    <label>Tier Name</label>
    <input
      v-model="editable.name"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Cost</label>
    <input
      v-model="editable.cost"
      type="number"
      min="0"
      max="150"
      aria-describedby="helpId"
      required
    />
    <button type="button" data-bs-dismiss="modal">cancel</button>
    <button type="submit">Create!</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity"
import { projectsService } from "../services/ProjectsService"
import Pop from "../utils/Pop"
import { tiersService } from "../services/TiersService"
import { useRoute } from "vue-router"
import { Modal } from "bootstrap"
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async createTier() {
        try {
          editable.value.projectId = route.params.id
          await tiersService.createTier(editable.value)
          Pop.toast('Tier Created!')
          Modal.getOrCreateInstance(document.getElementById('create-tier')).hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_createTier.scss";
</style>
