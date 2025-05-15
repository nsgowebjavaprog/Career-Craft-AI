import {pgTable, serial, text, varchar} from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createBy:varchar('createBy').notNull(),
    createAt:varchar('createAt').notNull(),
    mockId:varchar('mockId').notNull()

})
// store the feedback and answer
//JsonFeedbackResp 2.42 version

export const UserAnswer = pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})