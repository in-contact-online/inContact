//import { Repository } from './api';
import { Repository } from './api/Repository.mjs';

/*
    In case of couple DB connections extend `cache`
*/
const cache = {
    instance: null,
};

/**
 * @function
 * @param {Object} options - repository options
 * @param {Object} options.db - db pool connection
 * @return {Object} - DB API
 */
export function createRepository(options = { shared: true }) {
    let repository;
    let shared;

    shared = shared || true;

    if (shared) {
        repository = cache.instance;
        if (repository) {
            return repository;
        }
    }

    repository = new Repository(options);

    if (shared) {
        cache.instance = repository;
    }

    return repository;
}
