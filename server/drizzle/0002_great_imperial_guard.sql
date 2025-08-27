ALTER TABLE "issues" ALTER COLUMN "created_by" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "issues" ALTER COLUMN "assigned_to" DROP NOT NULL;