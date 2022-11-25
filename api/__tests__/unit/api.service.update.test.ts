import { ICreate } from "../../common/interface";
import { createService } from "../../services/create.service";
import { updateService } from "../../services/update.service";
import { getQuizService } from "../../services/getQuiz.service";

const InputItem: ICreate = {
    quiz_name: "something",
    quiz_description: "something",
    quiz_data: [{
        question: 'hello',
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        correct_choice: "A"
    }],
};

let UpdateItem = {
    quizId: '101',
    userId: '1012',
    quiz_name: 'something',
    quiz_description: 'all about plants',
    quiz_data: [{
        question: 'hello',
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        correct_choice: "A"
    }],
    createdAt: 12123,
    updatedAt: 12111,
    players: {}
}


test('update failed with wrong quiz id', async () => {
    const result = await updateService(UpdateItem);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual('{}');
});

test('update success with changing quiz description', async () => {
    const UserId = 'xx0111';
    const createServiceResult = await createService(UserId, InputItem);
    expect(createServiceResult.statusCode).toBe(200);
    const createServiceResultParsed = JSON.parse(createServiceResult.body);

    UpdateItem.quizId = createServiceResultParsed.quizId;
    UpdateItem.userId = UserId;
    const updateServiceResult = await updateService(UpdateItem);
    expect(updateServiceResult.body).toEqual('{}');

    const getQuizServiceResult = await getQuizService(createServiceResultParsed.quizId);
    const getQuizServiceResultParsed = JSON.parse(getQuizServiceResult.body);
    expect(getQuizServiceResultParsed.quiz_description).toBe(UpdateItem.quiz_description);

});
