import {Configuration, Inject} from "@tsed/di";
import {BeforeInit, PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import {config} from "./config";
import * as rest from "./controllers/api";
import {initDB} from "zk-sql/engine/database";
import {listenToChain} from "zk-sql/engine/chainListener";


@Configuration({
    ...config,
    acceptMimes: ["application/json"],
    httpPort: process.env.PORT || 8083,
    httpsPort: false, // CHANGE
    componentsScan: false,
    mount: {
        "/api": [
            ...Object.values(rest)
        ],
    },
    swagger: [
        {
            path: "/doc",
            specVersion: "3.0.1"
        }
    ],
    middlewares: [
        cors(),
        cookieParser(),
        compress({}),
        methodOverride(),
        bodyParser.json(),
        bodyParser.urlencoded({
            extended: true
        })
    ],
    exclude: [
        "**/*.spec.ts"
    ]
})
export class Server implements BeforeInit {
    @Inject()
    protected app: PlatformApplication;

    @Configuration()
    protected settings: Configuration;

    async $beforeInit(): Promise<any> {
        await initDB(true, {
            name: "table1",
            columns: ["f1", "f2", "f3", "f4", "f5"],
            values: [
                [1, 4, 3, 4, 3],
                [2, 3, 4, 3, 8],
                [3, 4, 5, 8, 4],
                [4, 5, 6, 7, 2],
                [5, 4, 7, 8, 9],
            ]
        });
        await listenToChain(process.env.ZK_SQL_CONTRACT!);
    }
}
