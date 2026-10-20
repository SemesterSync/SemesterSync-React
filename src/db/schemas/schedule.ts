import { int, json, mysqlTable, varchar, datetime } from "drizzle-orm/mysql-core";

import type { Event } from "../../schemas/events";
export const scheduleTable = mysqlTable("schedules", {
    id: varchar({ length: 45 }).primaryKey(),

    name: varchar({ length: 255 }).notNull(),

    events: json().$type<Event[]>().notNull(),

    term: varchar({ length: 45}).notNull(),

    totalCredits: int().notNull().default(0),

    selectedDate: datetime(),
});

export type ScheduleTableResult = typeof scheduleTable.$inferSelect;