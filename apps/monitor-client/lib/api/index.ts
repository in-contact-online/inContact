import { AxiosClientApi, IAxiosClientApi } from './axios';
import { IMockClientApi, MockClientApi } from './mock';

type ConfigOptions = {
    type: string;
    options: {
        baseURL: string;
    };
};

export type ApiClient = IAxiosClientApi | IMockClientApi;

export const ClientTypes = {
    Mock: 'mock',
    Axios: 'axios',
};

/**
 * @param {Object} config - client configs
 * @param {String} config.type ['axios'] - control implementation 'mock' or 'axios'
 * @param {Object} config.options - API client options
 * @param {String} config.options.baseURL - application base url for an API client
 * @return {MockClientApi}
 */
function createClient(config: ConfigOptions = { type: ClientTypes.Mock, options: { baseURL: '' } }): ApiClient {
    const { type, options } = config;
    if (type === ClientTypes.Mock) {
        return new MockClientApi();
    }
    return new AxiosClientApi(options);
}

export const client: ApiClient = createClient({
    type: ClientTypes.Axios,
    options: {
        baseURL: process.env.IN_CONTACT_MONITOR_API_BASE_URL || '',
    },
});
