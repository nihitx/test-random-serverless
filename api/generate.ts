'use strict';
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

import { respond } from "./common/response";
import {IGenerateSchema} from "./common/interface";
import { generateService } from "./services/generate.service";

module.exports.generate = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const data = JSON.parse(event.body as any);
  const validation = IGenerateSchema.safeParse(data);

  if (!validation.success) {
    return respond(403, validation.error);
  }
  
  return generateService(data);
};
