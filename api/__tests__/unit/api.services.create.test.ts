import { ICreate } from "../../common/interface";
import {createService} from "../../services/create.service";

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

test('service create sucess 200', async () => {
   const result = await createService('10101', InputItem);
   expect(result.statusCode).toBe(200);
});
