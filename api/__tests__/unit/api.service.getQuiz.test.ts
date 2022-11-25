import { ICreate } from "../../common/interface";
import {createService} from "../../services/create.service";
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

  test('service get returns empty with wrong quizid', async () => {
    const createResult = await createService('10101', InputItem);
    expect(createResult.statusCode).toBe(200);
 
    const getResult = await getQuizService('xxxx');
    console.log(getResult);
    expect(getResult.statusCode).toBe(200);
    expect(getResult.body).toBe(undefined);
 });

test('service get sucess 200', async () => {
   const createResult = await createService('10101', InputItem);
   expect(createResult.statusCode).toBe(200);
   const createResultParsed = JSON.parse(createResult.body);

   const getResult = await getQuizService(createResultParsed.quizId);
   expect(getResult.statusCode).toBe(200);
   const getResultParsed = JSON.parse(getResult.body);
   expect(getResultParsed.quiz_data).toMatchObject(InputItem.quiz_data);
});
