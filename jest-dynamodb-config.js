module.exports = {
    tables: [
        {
            TableName: 'kwizie-table-jest',
            KeySchema: [
                {
                    AttributeName: 'quizId',
                    KeyType: 'HASH',
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'quizId',
                    AttributeType: 'S',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    ],
};

