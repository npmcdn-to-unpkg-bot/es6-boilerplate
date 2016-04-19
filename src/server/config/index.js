import path from 'path';
import convict from 'convict';
 
// Schema
var conf = convict({
    env: {
        doc: "The App Environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT"
    },
    database: {
        doc: "setting database parameters",
        client: {
            doc: "Specify the type of the database (supported by knex)",
            default:'sqlite3'
        },
        connection: {
            doc: "Specify knex connection parameters",
            filename: {
                default: "./server.db"
            }
        }
    }
});
 
conf.loadFile(path.join(__dirname, 'globals.json'))
conf.loadFile(path.join(__dirname, "./env/" + conf.get("env") + ".json"));

// perform validation
conf.validate();
export default conf