import {ICreate, ICreateInputItem, IResponse} from "../common/interface";
import {respond} from "../common/response";
import * as uuid from "uuid";
import {dynamoDb, tableNameGlobal} from "../common/dynamodb";

export const createService = async (userId: string, data: ICreate): Promise<IResponse> => {

    const timestamp = new Date().getTime();
    const quizId = uuid.v1();
    const InputItem: ICreateInputItem = {
      userId: userId,
      quizId: quizId,
      quiz_name: data.quiz_name,
      quiz_description: data.quiz_description,
      quiz_data: data.quiz_data,
      createdAt: timestamp,
      updatedAt: timestamp,
      players: [],
    };
  
    const params: any = {
      TableName: tableNameGlobal,
      Item: InputItem,
    };
  
    try {
      await dynamoDb.put(params).promise();
    } catch (err) {
      return respond(403,err);
    }
    return respond(200 , {quizId: quizId});
}
