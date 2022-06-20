<template>
  <form id="project-form">
    <label>Project Name</label>
    <input
      v-model="editable.name"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Category</label>
    <input
      v-model="editable.category"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Cover Image</label>
    <input
      v-model="editable.img"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Description</label>
    <textarea v-model="editable.description" required />
    <button type="button" data-bs-dismiss="modal">cancel</button>
    <button v-if="!project" type="button" @click="createProject">
      Create!
    </button>
    <button v-else type="button" @click="editProject">Save!</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity"
import { projectsService } from "../services/ProjectsService"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
import { onMounted, watchEffect } from '@vue/runtime-core'
export default {
  props: { project: { type: Object, required: false } },
  setup(props) {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.project }
    })
    return {
      editable,
      async createProject() {
        try {
          await projectsService.createProject(editable.value)
          Pop.toast('Project Created!')
          Modal.getOrCreateInstance(document.getElementById('create-project')).hide()
        } catch (error) {
          Pop.error(error)
        }
      },
      async editProject() {
        try {
          await projectsService.editProject(editable.value)
          Pop.toast('Project updated!')
          Modal.getOrCreateInstance(document.getElementById('edit-project')).hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_projectForm.scss";
</style>
