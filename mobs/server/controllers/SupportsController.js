import { Auth0Provider } from '@bcwdev/auth0provider'
import { supportsService } from '../services/SupportsService.js'
import BaseController from '../utils/BaseController'

export class SupportsController extends BaseController {
  constructor() {
    super('api/supports')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.changeTier)
      .delete('/:id', this.delete)
  }
  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const support = await supportsService.create(req.body)
      return res.send(support)
    } catch (error) {
      next(error)
    }
  }
  async changeTier(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const update = await supportsService.changeTier(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await supportsService.delete(req.params.id, req.userInfo.id)
      return res.send('Unsupported')
    } catch (error) {
      next(error)
    }
  }
}
