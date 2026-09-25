ALTER TABLE `schedule_shares` ADD `token` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `schedule_shares` ADD `permission` varchar(10) DEFAULT 'view' NOT NULL;--> statement-breakpoint
ALTER TABLE `schedule_shares` ADD `expiration` datetime;--> statement-breakpoint
ALTER TABLE `schedule_shares` ADD `createdAt` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `schedule_shares` ADD CONSTRAINT `schedule_shares_token_unique` UNIQUE(`token`);