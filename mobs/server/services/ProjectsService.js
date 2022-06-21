import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class ProjectsService {
  async getAll(query = {}) {
    let projects = await dbContext.Projects.find(query).populate('creator', 'name picture')
    return projects
  }
  async getById(id) {
    let project = await dbContext.Projects.findById(id).populate('creator', 'name picture')
    return project
  }
  async create(body) {
    let project = await dbContext.Projects.create(body)
    await project.populate('creator', 'name picture')
    return project
  }
  async update(id, update) {
    const original = await dbContext.Projects.findById(id).populate('creator', 'name picture')
    if (original.creatorId.toString() != update.creatorId) {
      throw new BadRequest("you don't have permission to edit that project")
    }
    original.name = update.name ? update.name : original.name
    original.description = update.description ? update.description : original.description
    original.category = update.category ? update.category : original.category
    original.save()
    return update
  }
  async delete(id, userId) {
    const project = await dbContext.Projects.findById(id)
    if (project.creatorId.toString() != userId) {
      throw new BadRequest("you don't have permission to delete that project")
    }
    // TODO data clean up
    await project.remove()
    return `deleted project ${project.name}, and all of it's data`
  }

}

export const projectsService = new ProjectsService()
