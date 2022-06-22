import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class TiersService {

  async getProjectTiers(projectId) {
    let tiers = await dbContext.Tiers.find({ projectId })
    return tiers
  }
  async create(body) {
    let tier = await dbContext.Tiers.create(body)
    await tier.populate('creator', 'name picture')
    return tier
  }

  /**
   * Sets the closed property to true
   * @param {String} id - The Tier Id
   * @param {String} userId - The Id of the current user
   */
  async closeTier(id, userId) {
    const tier = await dbContext.Tiers.findById(id)
    if (tier.creatorId.toString() != userId) {
      throw new BadRequest("you don't have permission to delete that tier")
    }
    tier.closed = true
    await tier.save()
  }

  async delete(id, userId) {
    const tier = await dbContext.Tiers.findById(id)
    if (tier.creatorId.toString() != userId) {
      throw new BadRequest("you don't have permission to delete that tier")
    }
    // AWAIT do not delete if there are backers
    const backers = await dbContext.Support.find({ tierId: id })
    if (backers.length) {
      throw new BadRequest(`Cannot delete Tier. Currently supported by ${backers.length} users. Please Close the Tier`)
    }

    await tier.remove()
    return `deleted tier ${tier.name}`
  }

}

export const tiersService = new TiersService()
