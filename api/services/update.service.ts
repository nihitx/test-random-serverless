'use strict';
import { dynamoDb, tableNameGlobal } from "../common/dynamodb";
import { IUpdate, IResponse } from "../common/interface";
import { respond } from "../common/response";

export const updateService = async (data: IUpdate): Promise<IResponse> => {

  const timestamp = new Date().getTime();

  const InputItem: IUpdate = {
    userId: data.userId,
    quizId: data.quizId,
    quiz_name: data.quiz_name,
    quiz_description: data.quiz_description,
    quiz_data: data.quiz_data,
    createdAt: data.createdAt,
    updatedAt: timestamp,
    players: data.players
  };

  const params: any = {
    TableName: tableNameGlobal,
    Item: InputItem
  };

  try {
    const result = await dynamoDb.put(params).promise();
    return respond(200, result);
  } catch (err) {
    return respond(500, err);
  }

};