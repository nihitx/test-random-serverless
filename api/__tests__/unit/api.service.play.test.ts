import { ICreate } from "../../common/interface";
import { createService } from "../../services/create.service";
import { getQuizService } from "../../services/getQuiz.service";
import { playService } from "../../services/play.service";

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

let playItem: any = {
    quizId: '101',
    userId: '1',
    quizResult: {
        player_name: 'masnad',
        total_quiz_count: 10,
        detail: [{
            question: "Hello world",
            correct_choice: "A",
            selected: "B",
            score: 0
        }]
    }
}

test('play service returns 404 since no quiz has been created ', async () => {
    const getResult = await playService(playItem);

    expect(getResult.statusCode).toBe(404);
});

test('play service gets  sucess 200', async () => {
    const userId = '10101';
    const createResult = await createService(userId, InputItem);
    expect(createResult.statusCode).toBe(200);
    const createResultParsed = JSON.parse(createResult.body);

    playItem.quizId = createResultParsed.quizId;
    playItem.userId = userId;
    const getResult = await playService(playItem);
    expect(getResult.statusCode).toBe(200);

    const getServiceResult = await getQuizService(playItem.quizId);
    const getServiceResultParsed = JSON.parse(getServiceResult.body);
    const players = getServiceResultParsed.players;
    expect(players).toMatchObject([playItem.quizResult]);
});
