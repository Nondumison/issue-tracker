ALTER TABLE "issues" ADD COLUMN "created_by" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "issues" ADD COLUMN "assigned_to" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;