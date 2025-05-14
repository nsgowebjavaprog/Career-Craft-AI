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