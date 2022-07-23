import pkg from 'pg';

const { Pool } = pkg;

function QueryAsync(pool) {
    return async function queryAsync(sqlStatement, params) {
        if (!sqlStatement) throw new Error('WRONG_SQL_STATEMENT');
        let conn;
        let promise;
        try {
            conn = await pool.connect();
            if (params) {
                promise = conn.query(sqlStatement, params);
            } else {
                promise = conn.query(sqlStatement);
            }
            const result = await promise;
            conn.release();

            return result;
        } catch (err) {
            if (conn) conn.release(); //release to pool
            throw new Error(err);
        }
    };
}

/**
 * @function
 * @param {Object} options - database connection options
 * @param {String} options.host - database host name
 * @param {String} options.port - database port number
 * @param {String} options.user - database user
 * @param {String} options.database - database schema name
 * @param {String} options.password - database password
 * @param {Number} options.connectionsLimit - database user
 * @return {Object} - DB API
 */
export function createPgDbConnection(options) {
    let pool = new Pool(options);
    return {
        pool,
        queryAsync: QueryAsync(pool),
    };
}
