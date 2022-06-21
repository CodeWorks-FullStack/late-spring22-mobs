<template>
  <div class="project-page">
    <!-- PROJECT DETAILS -->
    <section id="project">
      <img :src="project.img" alt="" />
      <div>
        <h4>{{ project.name }}</h4>
        <p v-if="project.createdAt"> funded since {{ formatDate(project.createdAt) }} </p>
        <button v-if="account.id == project.creatorId" data-bs-toggle="modal" data-bs-target="#edit-project">
          <i class="mdi mdi-pencil"></i> edit </button>
      </div>
      <Supporters />
      <Modal id="edit-project">
        <template #header>Edit {{ project.name }}</template>
        <template #body>
          <ProjectForm :project="project" />
        </template>
      </Modal>
    </section>
    <!-- TIERS CONTAINER -->
    <section id="tiers-container">
      <h5>tiers</h5>
      <div class="tiers">
        <Tier v-for="t in tiers" :key="t.id" :tier="t" />
      </div>
      <button v-if="project.creatorId == account.id" data-bs-toggle="modal" data-bs-target="#create-tier">
        <i class="mdi mdi-plus"></i>
      </button>
      <Modal id="create-tier">
        <template #header>Create Tier</template>
        <template #body>
          <CreateTier />
        </template>
      </Modal>
    </section>
    <!-- POSTS CONTAINER -->
    <section id="posts-container">
      <!-- CREATE POST -->
      <CreatePost v-if="project.creatorId == account.id" />
      <div class="tier-filter">
        <div>filter posts by:</div>
        <button @click="filterTier = ''">all</button>
        <button v-for="t in tiers" :key="t.id" @click="filterTier = t.id"> {{ t.name }} </button>
      </div>
      <div id="posts">
        <p v-if="lockedPosts">Locked Posts: {{ lockedPosts }}</p>
        <Post v-for="p in posts" :key="p.id" :post="p" />
        <div v-if="posts.length <= 0">No Posts to show</div>
        <div v-if="!isSupporter && project.creatorId != account.id"> please support this creator to see their posts <i
            class="mdi mdi-lock"></i>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { projectsService } from '../services/ProjectsService'
import { supportsService } from '../services/SupportsService.js'
import { tiersService } from '../services/TiersService'
import Pop from '../utils/Pop'

export default {
  setup() {
    const route = useRoute()
    const filterTier = ref('')
    watchEffect(async () => {
      try {
        if (route.name == 'ProjectDetails') {
          // this is to re-run gets if you support a project
          AppState.supportedProjects.length
          await projectsService.getProject(route.params.id)
          await tiersService.getTiersByProject(route.params.id)
          await postsService.getPostsByProject(route.params.id)
          await supportsService.getSupportsByProject(route.params.id)
        }
      } catch (error) {
        Pop.error(error)
      }
    })
    return {
      filterTier,
      project: computed(() => AppState.activeProject),
      tiers: computed(() => AppState.tiers.sort((a, b) => a.cost - b.cost)),
      supporters: computed(() => AppState.supporters),
      // NOTE filters by tier id only IF there is a filter value, if there is not it returns all
      posts: computed(() => AppState.posts.filter(p => filterTier.value ? p.tierId == filterTier.value : true)),
      lockedPosts: computed(() => AppState.lockedPosts),
      isSupporter: computed(() => AppState.supportedProjects.find(p => AppState.activeProject.id == p.projectId)),
      account: computed(() => AppState.account),
      formatDate(rawDate) {
        let time = new Date(rawDate)
        let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
        let year = time.getUTCFullYear()
        return `${month} ${year}`
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/_projectPage.scss";
</style>
