import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService{
async createPost(body){
  const res = await api.post('api/posts', body)
  logger.log('[post post]', res.data)
  AppState.posts.push(res.data)
}

  async getPostsByProject(projectId){
    const res = await api.get('api/projects/'+projectId+ '/posts')
    logger.log('get posts', res.data)
    AppState.posts = res.data.posts
    AppState.lockedPosts = res.data.locked
  }

  async deletePost(postId){
    const res = await api.delete('api/posts/' + postId)
    logger.log('delete post', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }
}

export const postsService = new PostsService()
