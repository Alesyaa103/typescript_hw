import { callApi } from '../helpers/apiHelper';
import { IFighterService } from '../../interfaces/index';
import { Fighter } from '../../types/index';

class FighterService {
  async getFighters(): Promise<Fighter[]> {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id: string): Promise<Fighter> {
    try {
      const endpoint = `details/fighter/${id}.json`;
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService: IFighterService = new FighterService();
