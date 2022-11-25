'use strict';
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import {IUpdateSchema} from "./common/interface";
import { respond } from './common/response';
import { updateService } from './services/update.service';

module.exports.update = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const data = JSON.parse(event.body as any);
  const userId = event.requestContext.authorizer?.claims.sub ?? null;
  data.push({userId: userId});
  const validation = IUpdateSchema.safeParse(data);

  if (!validation.success) {
    return respond(403, validation.error);
  }
  return updateService(data);
};