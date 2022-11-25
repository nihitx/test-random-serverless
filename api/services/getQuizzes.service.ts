'use strict';
import {IQuizzesTableParam, IResponse} from "../common/interface";
import { respond } from "../common/response";
import { dynamoDb, tableNameGlobal } from "../common/dynamodb";

export const getQuizzesService = async (userId: string): Promise<IResponse> => {

  const params: IQuizzesTableParam = {
    TableName: tableNameGlobal,
    IndexName: 'quizIdIndex',
    KeyConditionExpression: 'userId = :user_id',
    ExpressionAttributeValues: { ':user_id': userId }
  };

  try {
    let result = await dynamoDb.query(params).promise();
    return respond(200, result);
  } catch (err) {
    console.log(err);
    return respond(404, err);
  }
};