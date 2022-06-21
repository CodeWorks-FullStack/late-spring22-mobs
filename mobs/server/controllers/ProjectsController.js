import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import { projectsService } from '../services/ProjectsService'
import { supportsService } from '../services/SupportsService'
import { tiersService } from '../services/TiersService'
import BasController from '../utils/BaseController'

export class ProjectsController extends BasController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tiers', this.getTiers)
      .get('/:id/supports', this.getSupporters)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/posts', this.getPosts)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectsService.getAll(req.query)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const project = await projectsService.getById(req.params.id)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.create(req.body)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.update(req.params.id, req.body)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const message = await projectsService.delete(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getPosts(req, res, next) {
    try {
      const userInfo = req.userInfo
      const posts = await postsService.getProjectPosts(req.params.id, userInfo.id)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getTiers(req, res, next) {
    try {
      const tiers = await tiersService.getProjectTiers(req.params.id)
      return res.send(tiers)
    } catch (error) {
      next(error)
    }
  }

  async getSupporters(req, res, next) {
    try {
      const supports = await supportsService.getProjectSupporters(req.params.id)
      return res.send(supports)
    } catch (error) {
      next(error)
    }
  }
}
