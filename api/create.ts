"use strict";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { ICreateSchema } from "./common/interface";
import { respond } from "./common/response";
import { createService } from "./services/create.service";


module.exports.create = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const data = JSON.parse(event.body as any);
  const validation = ICreateSchema.safeParse(data);

  if (!validation.success) {
    return respond(403, validation.error);
  }

  const userId: string = event?.requestContext?.authorizer?.claims.sub;
  return createService(userId, data);
};
