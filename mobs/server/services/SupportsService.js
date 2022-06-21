import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class SupportsService {
  async getAccountProjectSupport(accountId, projectId) {
    const support = await dbContext.Support.findOne({ accountId, projectId })
      .populate('account', 'name picture')
      .populate('tier')
      .populate('project')
    if (!support) {
      throw new BadRequest("Invalid Id")
    }
    return support
  }
  async getMySupports(accountId) {
    const projects = await dbContext.Support.find({ accountId })
      .populate('project')
      .populate('tier')
  }
  async getProjectSupporters(projectId) {
    const supporters = await dbContext.Support.find({ projectId })
      .populate('account', 'name picture')
      .populate('tier')
    return supporters
  }

  async getById(id) {
    const support = await dbContext.Support.findById(id)
    if (!support) {
      throw new BadRequest("Invalid Id")
    }
    return support
  }
  async create(supportData) {
    // do they already have a backing
    const isSupporting = await this.getAccountProjectSupport(supportData.accountId, supportData.projectId)
    if (isSupporting) {
      throw new BadRequest('You Already support this project')
    }
    const support = await dbContext.Support.create(supportData)
    await support.populate('project')
    await support.populate('tier')
    return support
  }
  async changeTier(supportData) {
    const original = await this.getById(supportData.id)
    if (original.accountId.toString() != supportData.accountId) {
      throw new Forbidden("You cannot edit someone elses support")
    }
    // TODO[epic=Mick] check that tier id is a tier of that project
    original.tierId = supportData.tierId || original.tierId
    await original.save()
    return original
  }
  async delete(id, userId) {
    const support = await this.getById(id)
    if (support.accountId.toString() != userId) {
      throw new Forbidden("Cannot remove another users support")
    }
    await support.remove()
  }


}

export const supportsService = new SupportsService()
