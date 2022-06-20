import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TiersService{
  async getTiersByProject(projectId){
    const res = await api.get('api/projects/'+projectId+'/tiers')
    logger.log('get Tiers', res.data)
    AppState.tiers = res.data
  }

  async createTier(body){
    const res = await api.post('api/tiers', body)
    logger.log('created tier', res.data)
    AppState.tiers.push(res.data)
  }

  async deleteTier(id){
    const res = await api.delete('api/tiers/' + id)
    logger.log('delete tier', res.data)
    AppState.tiers = AppState.tiers.filter(t => t.id != id)
  }
}

export const tiersService = new TiersService()
