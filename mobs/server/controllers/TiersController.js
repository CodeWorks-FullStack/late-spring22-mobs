import { Auth0Provider } from '@bcwdev/auth0provider';
import { tiersService } from '../services/TiersService';
import BasController from '../utils/BaseController';

export class TiersController extends BasController{
    constructor(){
      super('api/tiers')
      this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
    }



    async create(req, res, next){
      try {
        req.body.creatorId = req.userInfo.id
        const tier = await tiersService.create(req.body)
        return res.send(tier)
      } catch (error) {
        next(error)
      }
    }



    async delete(req, res, next){
      try {
        const message = await tiersService.delete(req.params.id, req.userInfo.id)
        return res.send(message)
      } catch (error) {
        next(error)
      }
    }
}
