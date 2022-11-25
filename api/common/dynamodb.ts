import { DynamoDB } from "aws-sdk";
let option = {}
let tableName = process.env.KWIZIE_TABLE; 
if (process.env.JEST_WORKER_ID) {
    option = {
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        sslEnabled: false,
    };
    tableName = 'kwizie-table-jest'
}
export const tableNameGlobal = tableName;
export const dynamoDb = new DynamoDB.DocumentClient(option);
