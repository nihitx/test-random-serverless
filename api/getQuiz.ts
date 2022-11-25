'use strict';
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { respond } from "./common/response";
import { getQuizService } from "./services/getQuiz.service";

module.exports.get = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  if(!event.pathParameters?.id) {
    return respond(403, "quiz id not found");
  }
  return getQuizService(event.pathParameters?.id);
};