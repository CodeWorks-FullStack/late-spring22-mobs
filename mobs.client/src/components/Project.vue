<template>
  <div class="project-card" @click="selectProject">
    <img :src="project.img" alt="" />
    <div>
      <h5>{{ project.name }}</h5>
      <p>{{ project.description }}</p>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router'
export default {
  props: { project: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      selectProject() {
        router.push({ name: 'ProjectDetails', params: { id: props.project.id } })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/_project.scss";
</style>
