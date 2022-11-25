import { openai } from "openai-node";
openai.api_key = process.env.OPENAI;
import {respond} from "../common/response";
import { IGenerate ,IResponse} from "../common/interface";

export const generateService = async (data: IGenerate): Promise<IResponse> => {
    try {
        let quiz = await openai.Completion.create({
            model:
                "davinci:ft-new-nordic-schools:mc-britannica-kwizie-2022-06-29-13-42-13",
            prompt: `Given a text, generate a question with three different incorrect choices, one correct choice, mark correct choice.\n###\ntext: ${data.textForQuiz} \nquestion:`,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 1,
            n: 1,
            stream: false,
            logprobs: null,
            echo: false,
            best_of: 1,
            stop: null,
        });

        const quiz_body = quiz.choices[0].text;
        return respond(200,quiz_body);
    } catch (err) {
        return respond(500,err);
    }


}


