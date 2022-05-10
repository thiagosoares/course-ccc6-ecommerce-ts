import Connection from "./Connection";
import pgp from "pg-promise";

export default class PostgreSqlConnectionAdapter implements Connection {
	pgp: any;

	constructor () {

		let pgHost = "localhost"
		let pgUser = "ecommerce"
		let pgPasswd = "ecommerce"

		if (process.env.POSTGRES_HOST) {
			pgHost = process.env.POSTGRES_HOST
		}
		if (process.env.POSTGRES_USER) {
			pgUser = process.env.POSTGRES_USER
		}
		if (process.env.POSTGRES_PASSWORD) {
			pgPasswd = process.env.POSTGRES_PASSWORD
		}
		this.pgp = pgp()("postgres://"+pgUser+":"+pgPasswd+"@"+pgHost+":5432/ecommerce");
	}

	query(statement: string, params: any): Promise<any> {
		return this.pgp.query(statement, params);
	}

	close(): Promise<void> {
		return this.pgp.connection.close
	}


}
