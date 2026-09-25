import {
    datetime,
    int,
    mysqlTable,
    varchar,
} from "drizzle-orm/mysql-core";
import { scheduleTable } from "./schedule";

export const scheduleSharesTable = mysqlTable("schedule_shares", {
    id: int().autoincrement().primaryKey(),

    scheduleId: varchar({ length: 45 }).notNull().references(() => scheduleTable.id, { onDelete: "cascade" }),

    token: varchar({ length: 64 }).notNull().unique(),

    permission: varchar({ length: 10 }).notNull().default("view"),

    expiration: datetime(),

    createdAt: datetime().notNull(),
});

export type ScheduleSharesTableResult = typeof scheduleSharesTable.$inferSelect;