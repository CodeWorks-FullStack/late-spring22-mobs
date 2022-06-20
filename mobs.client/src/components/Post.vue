<template>
  <div class="post">
    <img :src="post.imgUrl" alt="" />
    <i
      class="mdi mdi-delete"
      v-if="post.creatorId == account.id"
      @click="deletePost"
    ></i>
    <div>
      <h5>{{ post.title }}</h5>
      <!-- <h5>{{ post.tier.cost }}</h5> need to double populate to get this back -->
      <p>
        {{ post.body }}
      </p>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deletePost() {
        try {
          if (await Pop.confirm()) {
            await postsService.deletePost(props.post.id)
            Pop.toast('Post Deleted', 'success')
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_post.scss";
</style>
