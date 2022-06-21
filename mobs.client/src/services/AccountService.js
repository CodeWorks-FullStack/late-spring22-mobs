import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyProjects() {
    const res = await api.get('account/projects')
    logger.log('account projects', res.data)
    AppState.accountProjects = res.data
  }

  async getSupports() {
    try {
      const res = await api.get('account/supports')
      logger.log('[supported Projects]', res.data)
      AppState.supportedProjects = res.data
    } catch (error) {
      Pop.error(error)
    }
  }
}

export const accountService = new AccountService()
