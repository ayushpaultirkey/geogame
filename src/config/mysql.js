import mysql from "mysql";
import "dotenv/config";

const MySQL = {
    Connection: class {
        constructor(url = (process.env.DATABASE_URL || "mysql://root:@localhost:3306/sns")) {

            /** @type {mysql.Connection} */
            this.connection = mysql.createConnection(url);
            
        }
        /**
            * Connect to a mysql server
            * @returns {mysql.Connection}
        */
        Connect() {
            return new Promise((resolve, reject) => {
                this.connection.connect((error) => {
                    if(error) {
                        reject("Unable to connect to database");
                        return false;
                    };
                    resolve(true);
                });
            });
        }
        /**
            * Perform query and return result
            * @param {string} query 
            * @param {string[] | number[]} parameter 
            * @returns {mysql.Query}
        */
        Query(query = "", parameter = []) {
            
            return new Promise((resolve, reject) => {

                const _query = this.connection.format(query, parameter);

                this.connection.query(_query, (error, result) => {
                    if(error) {
                        reject(`Unable to perform query: ${error.message}`);
                        return false;
                    };
                    resolve(result);
                });

            });

        }

        /**
            * Close the active connection
        */
        Close() {
            this.connection.end();
        }
    }

};

export default MySQL;