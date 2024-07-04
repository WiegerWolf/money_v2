import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    name: text("name"),
});

export const financialData = sqliteTable("financial_data", {
    id: integer("id").primaryKey(),
    date: text("date"),
    income: real("income"),
    worth: real("worth"),
});