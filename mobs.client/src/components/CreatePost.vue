<template>
  <div id="create-post">
    <h6>create a post for your supporters</h6>
    <form @submit.prevent="createPost">
      <input
        type="text"
        required
        placeholder="Post title"
        v-model="editable.title"
      />
      <textarea
        cols="30"
        rows="8"
        required
        placeholder="Say Something..."
        v-model="editable.body"
      ></textarea>
      <div>
        <input
          type="text"
          placeholder="post image url"
          v-model="editable.imgUrl"
        />
        <select v-model="editable.tierId" required>
          <option value="" disabled selected>Select a tier</option>
          <option v-for="t in tiers" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </div>
      <div>
        <button>cancel</button>
        <button>create post!</button>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
export default {
  name: 'create-post',

  setup() {
    const editable = ref({ tierId: '' })
    const route = useRoute()
    return {
      editable,
      tiers: computed(() => AppState.tiers),
      async createPost() {
        try {
          editable.value.projectId = route.params.id
          await postsService.createPost(editable.value)
          Pop.toast('Post Created!', 'success')
          // reset form to as the page was when loaded
          editable.value = { tierId: '' }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_createPost.scss";
</style>
