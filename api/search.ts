import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import {ISearchSchema } from "./common/interface";
import { respond } from "./common/response";
import { searchService } from "./services/search.service";


module.exports.search = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const data = JSON.parse(event.body as any);
  const validation = ISearchSchema.safeParse(data);

  if (!validation.success) {
    return respond(403, validation.error);
  }
  return searchService(data);
}
