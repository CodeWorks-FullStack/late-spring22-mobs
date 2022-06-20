import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService{
  async createProject(body){
    const res = await api.post('api/projects', body)
    logger.log('created project', res.data)
    AppState.accountProjects.push(res.data)
  }

  async getProjects(query = ''){
    const res = await api.get('api/projects' + query)
    logger.log('[get projects]', res.data)
    AppState.projects = res.data
  }

  async getProject(id){
    const res =  await api.get('api/projects/'+id)
    logger.log('[get project]', res.data)
    AppState.activeProject = res.data
  }

  async editProject(body){
    const res = await api.put('api/projects/'+ body.id, body)
    logger.log('edit project', res.data)
    AppState.activeProject = res.data
  }
}

export const projectsService = new ProjectsService()
