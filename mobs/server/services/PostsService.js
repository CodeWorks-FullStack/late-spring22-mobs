import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { projectsService } from "./ProjectsService";
import { supportsService } from "./SupportsService";


class PostsService{

  // TODO GET POSTS FOR ONLY THAT USERS SUPPORT LEVEL AND LOWER
  async getProjectPosts(projectId, userId){
    const project = await projectsService.getById(projectId)
    const posts = await dbContext.Posts.find({projectId}).sort({createdAt: -1}).populate('tier')
    // if creator return all posts
    if(project.creatorId.toString() == userId){
      return {posts, locked: 0}
    }
    const supportTier = await supportsService.getAccountProjectSupport(userId, projectId)
    // if not supporter return nothing
    if(!supportTier){
      return {posts: [], locked: posts.length}
    }
    // if supporter return only posts you have access to
    const filtered = posts.filter(p => {
    return  p.tier.cost <= supportTier.tier.cost
    })
    return {posts: filtered, locked: posts.length - filtered.length}
  }

  async create(body) {
    let post = await dbContext.Posts.create(body)
    await post.populate('creator', 'name picture')
    return post
  }
  async update(id, update) {
    const original = await dbContext.Posts.findById(id).populate('creator', 'name picture')
    if(original.creatorId.toString() != update.creatorId){
      throw new BadRequest("you don't have permission to edit that post")
    }
    original.title = update.title ? update.title : original.title
    original.body = update.body ? update.body : original.body
    original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl
    original.tierId = update.tierId ? update.tierId : original.tierId
    original.save()
    return update
  }
  async delete(id, userId) {
    const post = await dbContext.Posts.findById(id)
    if(post.creatorId.toString() != userId){
      throw new BadRequest("you don't have permission to delete that post")
    }
    post.remove()
    return `deleted post ${post.title}`
  }

}

export const postsService = new PostsService();
