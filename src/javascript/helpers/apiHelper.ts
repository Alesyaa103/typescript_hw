import { fightersDetails, fighters } from './mockData';
import { Fighter } from '../../types/index';

const API_URL: string = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';
const useMockAPI: boolean = true;

async function callApi(endpoint: string, method: string): Promise<any> {
  const url = API_URL + endpoint;
  const options: object = {
    method,
  };

  return useMockAPI
    ? fakeCallApi(endpoint)
    : fetch(url, options)
        .then((response) => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
        .then((result) => JSON.parse(atob(result.content)))
        .catch((error) => {
          throw error;
        });
}

async function fakeCallApi(endpoint: string): Promise<any> {
  const response = endpoint === 'fighters.json' ? fighters : getFighterById(endpoint);

  return new Promise((resolve, reject) => {
    setTimeout(() => (response ? resolve(response) : reject(Error('Failed to load'))), 500);
  });
}

function getFighterById(endpoint: string): Fighter {
  const start = endpoint.lastIndexOf('/');
  const end = endpoint.lastIndexOf('.json');
  const id = endpoint.substring(start + 1, end);

  return fightersDetails.find((it) => it._id === id);
}

export { callApi };
