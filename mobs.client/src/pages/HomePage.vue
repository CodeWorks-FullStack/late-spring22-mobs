<template>
  <div class="home container">
    <div class="row hero-banner rounded mt-3">
      <div class="col-12 text-center">
        <h5> “It is literally true that you can succeed best and quickest by helping others to succeed.” </h5>
        <p>-Napoleon Hill</p>
      </div>
    </div>
    <div class="row ps-3 baloo">find what inspires you</div>
    <div class="row projects-row">
      <div v-for="p in projects" :key="p.id" class="col-12">
        <Project :project="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.error(error)
      }
    })
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_homePage.scss";
</style>
