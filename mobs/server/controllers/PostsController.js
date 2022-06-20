import { Auth0Provider } from '@bcwdev/auth0provider';
import { postsService } from '../services/PostsService';
import BasController from '../utils/BaseController';

export class PostsController extends BasController{
    constructor(){
      super('api/posts')
      this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete)
    }

    async create(req, res, next){
      try {
        req.body.creatorId = req.userInfo.id
        const post = await postsService.create(req.body)
        return res.send(post)
      } catch (error) {
        next(error)
      }
    }

    async update(req, res, next){
      try {
        req.body.creatorId = req.userInfo.id
        const post = await postsService.update(req.params.id, req.body)
        return res.send(post)
      } catch (error) {
        next(error)
      }
    }

    async delete(req, res, next){
      try {
        const message = await postsService.delete(req.params.id, req.userInfo.id)
        return res.send(message)
      } catch (error) {
        next(error)
      }
    }
}
