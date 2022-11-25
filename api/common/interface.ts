import { z } from "zod";

export interface IResponse  {
    statusCode : number,
    body: any
}
export const ICreateSchema = z.object({
    quiz_name: z.string(),
    quiz_description: z.string(),
    quiz_data: z.array(
      z.object({
        question: z.string(),
        A: z.string(),
        B: z.string(),
        C: z.string(),
        D: z.string(),
        correct_choice: z.string()
      })
    )
  });
  
  export type ICreate = z.infer<typeof ICreateSchema>;

  export const ICreateInputItemSchema = z.object({
    userId: z.string(),
    quizId: z.string().uuid(),
    quiz_name: z.string(),
    quiz_description: z.string(),
    players: z.any(),
    createdAt: z.number(),
    updatedAt: z.number(),
    quiz_data: z.array(
      z.object({
        question: z.string(),
        A: z.string(),
        B: z.string(),
        C: z.string(),
        D: z.string(),
        correct_choice: z.string()
      })
    )
  });
  
  export type ICreateInputItem = z.infer<typeof ICreateInputItemSchema>;

  export interface IQuizzesTableParam {
    TableName: string | any,
    IndexName: string,
    KeyConditionExpression: string,
    ExpressionAttributeValues: object
  }

  export const IUpdateSchema = z.object({
    userId: z.string().uuid(),
    quizId: z.any(),
    quiz_name: z.string(),
    quiz_description: z.string(),
    quiz_data: z.array(
      z.object({
        question: z.string(),
        A: z.string().max(1),
        B: z.string().max(1),
        C: z.string().max(1),
        D: z.string().max(1)
      })
    ),
    createdAt: z.number(),
    updatedAt: z.number(),
    players: z.any()
  });
  
  export type IUpdate = z.infer<typeof IUpdateSchema>;


export const IPlaySchema = z.object({
    quizId: z.any(),
    quizResult:
        z.object({
            player_name: z.string(),
            total_quiz_count: z.number(),
            details: z.array(
                z.object({
                    question: z.string(),
                    correct_choice: z.string().max(1),
                    selected: z.string().max(1),
                    score: z.boolean()
                })
            )
        })
})

export type IPlay = z.infer<typeof IPlaySchema>;

export const IGenerateSchema = z.object({
    textForQuiz: z.string(),
  
  })
  
export type IGenerate = z.infer<typeof IGenerateSchema>;

export const ISearchSchema = z.object({
    channel_author: z.enum(["Khan Academy", "The Infographics Show", "Big Think", "TED-Ed", "CrashCourse"])
  });
  
export type ISearch = z.infer<typeof ISearchSchema>;