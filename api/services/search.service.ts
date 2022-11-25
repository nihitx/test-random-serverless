import { Client } from "@opensearch-project/opensearch";
import { IResponse, ISearch } from "../common/interface";
import { respond } from "../common/response";
const AWS = require('aws-sdk')

const createAwsOpensearchConnector = require('aws-opensearch-connector')

const awsConfig = new AWS.Config({})

const client = new Client({
  ...createAwsOpensearchConnector(awsConfig),
  node: `https://${process.env.OPENSEARCH}`,
});

export const searchService = async (data: ISearch): Promise<IResponse> => {
  var query = {
    query: {
      match: {
        channel_author: {
          query: data.channel_author,
        },
      },
    },
  };

  try {
    var result = await client.search({
      index: "channel-index",
      body: query,
    });

    let SearchOutput = result.body.hits.hits;
    return respond(200, SearchOutput);
  } catch (err) {
    return respond(404, err);
  }
};
