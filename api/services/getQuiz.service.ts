'use strict';
import { respond } from "../common/response";
import { dynamoDb, tableNameGlobal } from "../common/dynamodb";
import { IResponse } from "../common/interface";

export const getQuizService = async (quizId: string): Promise<IResponse> => {
  const params: any = {
    TableName: tableNameGlobal,
    Key: {
      quizId: quizId,
    },
  };

  try {
    let result = await dynamoDb.get(params).promise();
    return respond(200, result.Item);

  } catch (err) {
    return respond(500, err);
  }
}