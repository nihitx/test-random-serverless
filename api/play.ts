'use strict';
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { IPlaySchema } from "./common/interface";
import { respond } from "./common/response";
import { playService } from "./services/play.service";

module.exports.play = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

    const data = JSON.parse(event.body as any);
    const validation = IPlaySchema.safeParse(data);
    if (!validation.success) {
        return respond(403, validation.error);
    }

    return playService(data);
};