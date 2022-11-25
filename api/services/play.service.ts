'use strict';
import {IPlay , IResponse} from "../common/interface";
import {dynamoDb, tableNameGlobal} from "../common/dynamodb";
import { respond } from "../common/response";

export const playService = async (inputEvent: IPlay): Promise<IResponse> => {
    
    const params: any = {
        TableName: tableNameGlobal,
        Key: {
            quizId: inputEvent.quizId,
        },
    };

    try {
        const result = await dynamoDb.get(params).promise();
        if(JSON.stringify(result) === '{}'){
            return respond(404, 'Body empty on get');
        }
        
        let quizData: any = result.Item;
        const timestamp = new Date().getTime();

        let newData = [...quizData.players, inputEvent.quizResult]
        quizData.players = newData
        quizData.createdAt = timestamp;

        const playInfo: any = {
            TableName: tableNameGlobal,
            Item: quizData
        };
        await dynamoDb.put(playInfo).promise();
    } catch (err) {
        return respond(500, err)
    }
    return respond(200, "Success");
};