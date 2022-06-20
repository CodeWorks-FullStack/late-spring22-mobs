import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class TiersService{
  async getProjectTiers(projectId) {
    let tiers = await dbContext.Tiers.find({projectId})
    return tiers
  }
  async create(body) {
    let tier = await dbContext.Tiers.create(body)
    await tier.populate('creator', 'name picture')
    return tier
  }
  async delete(id, userId) {
    const tier = await dbContext.Tiers.findById(id)
    if(tier.creatorId.toString() != userId){
      throw new BadRequest("you don't have permission to delete that tier")
    }
    await tier.remove()
    return `deleted tier ${tier.name}`
  }

}

export const tiersService = new TiersService();
