<template>
  <div class="account-page">
    <section id="account-details">
      <div>
        <p>{{ account.name }}</p>
        <p>{{ account.email }}</p>
      </div>
      <img :src="account.picture" alt="" />
    </section>
    <section id="account-projects">
      <h5>Your Projects</h5>
      <div id="projects-container">
        <div v-for="p in projects" :key="p.id">
          <router-link :to="{ name: 'ProjectDetails', params: { id: p.id } }"> {{ p.name }} </router-link>
        </div>
      </div>
      <button data-bs-toggle="modal" data-bs-target="#create-project">
        <i class="mdi mdi-plus"></i>
      </button>
    </section>
    <section id="supported-projects">
      <!-- TODO -->
      <h5>Projects You Support</h5>
      <div class="supports-container">
        <SupportedProject v-for="s in supportedProjects" :key="s.id" :support="s" />
      </div>
    </section>
  </div>
  <Modal id="create-project">
    <template #header>Create a Project</template>
    <template #body>
      <ProjectForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      await accountService.getMyProjects()
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.accountProjects),
      supportedProjects: computed(() => AppState.supportedProjects)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_accountPage.scss";
</style>
