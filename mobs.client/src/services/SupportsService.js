import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class SupportsService {
  async getSupportsByProject(projectId) {
    const res = await api.get(`/api/projects/${projectId}/supports`)
    AppState.supporters = res.data
  }
  async createSupport(supportData) {
    const res = await api.post('/api/supports', supportData)
    AppState.supporters.push(res.data)
    AppState.supportedProjects.push(res.data)
  }
  async updateTier(supportData) {
    const res = await api.put('/api/supports/' + supportData.id, supportData)
  }

  async deleteSupport(id) {
    await api.delete('api/supports/' + id)
    AppState.supportedProjects = AppState.supportedProjects.filter(s => s.id != id)
  }
}

export const supportsService = new SupportsService()
