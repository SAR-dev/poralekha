CREATE TABLE "p_accounts" (
	"user_id" text NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "p_accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "p_sessions" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "p_users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"email_verified" timestamp,
	"image" text,
	CONSTRAINT "p_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "p_verification_tokens" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "p_verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "p_batches" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"organization_id" text NOT NULL,
	"class_package_id" text NOT NULL,
	"teacher_id" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "p_batches_name_organization_id_unique" UNIQUE("name","organization_id"),
	CONSTRAINT "p_batches_class_package_id_teacher_id_organization_id_unique" UNIQUE("class_package_id","teacher_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE "p_classes" (
	"id" text PRIMARY KEY NOT NULL,
	"batch_id" text NOT NULL,
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone NOT NULL,
	"topic" text NOT NULL,
	"description" text,
	"meeting_link" text,
	"recording_link" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "p_class_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"class_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"teacher_id" text NOT NULL,
	"student_id" text NOT NULL,
	"teacher_price_tk" integer NOT NULL,
	"student_price_tk" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "p_class_packages" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"organization_id" text NOT NULL,
	"def_teacher_price_tk" integer NOT NULL,
	"def_student_price_tk" integer NOT NULL,
	"summary" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "p_class_packages_name_organization_id_unique" UNIQUE("name","organization_id")
);
--> statement-breakpoint
CREATE TABLE "p_enrollments" (
	"id" text PRIMARY KEY NOT NULL,
	"batch_id" text NOT NULL,
	"student_id" text NOT NULL,
	"teacher_price_tk" integer,
	"student_price_tk" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "p_enrollments_batch_id_student_id_unique" UNIQUE("batch_id","student_id")
);
--> statement-breakpoint
CREATE TABLE "p_moderators" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"nickname" varchar,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "p_moderators_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "p_organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"name" varchar NOT NULL,
	"logo" text,
	"slug" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "p_organizations_name_unique" UNIQUE("name"),
	CONSTRAINT "p_organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "p_students" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"nickname" varchar NOT NULL,
	"mobile_no1" varchar NOT NULL,
	"mobile_no2" varchar,
	"whatsapp_no" varchar,
	"email" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "p_students_user_id_organization_id_unique" UNIQUE("user_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE "p_teachers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"nickname" varchar NOT NULL,
	"summary" text,
	"portfolio" text,
	"mobile_no1" varchar NOT NULL,
	"mobile_no2" varchar,
	"whatsapp_no" varchar,
	"email" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "p_teachers_user_id_organization_id_unique" UNIQUE("user_id","organization_id")
);
--> statement-breakpoint
ALTER TABLE "p_accounts" ADD CONSTRAINT "p_accounts_user_id_p_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."p_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_sessions" ADD CONSTRAINT "p_sessions_user_id_p_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."p_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_batches" ADD CONSTRAINT "p_batches_organization_id_p_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."p_organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_batches" ADD CONSTRAINT "p_batches_class_package_id_p_class_packages_id_fk" FOREIGN KEY ("class_package_id") REFERENCES "public"."p_class_packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_batches" ADD CONSTRAINT "p_batches_teacher_id_p_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."p_teachers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_classes" ADD CONSTRAINT "p_classes_batch_id_p_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."p_batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_class_logs" ADD CONSTRAINT "p_class_logs_class_id_p_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."p_classes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_class_logs" ADD CONSTRAINT "p_class_logs_organization_id_p_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."p_organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_class_logs" ADD CONSTRAINT "p_class_logs_teacher_id_p_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."p_teachers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_class_logs" ADD CONSTRAINT "p_class_logs_student_id_p_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."p_students"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_class_packages" ADD CONSTRAINT "p_class_packages_organization_id_p_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."p_organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_enrollments" ADD CONSTRAINT "p_enrollments_batch_id_p_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."p_batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_enrollments" ADD CONSTRAINT "p_enrollments_student_id_p_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."p_students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_moderators" ADD CONSTRAINT "p_moderators_user_id_p_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."p_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_moderators" ADD CONSTRAINT "p_moderators_organization_id_p_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."p_organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_organizations" ADD CONSTRAINT "p_organizations_owner_id_p_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."p_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_students" ADD CONSTRAINT "p_students_user_id_p_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."p_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_students" ADD CONSTRAINT "p_students_organization_id_p_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."p_organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_teachers" ADD CONSTRAINT "p_teachers_user_id_p_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."p_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "p_teachers" ADD CONSTRAINT "p_teachers_organization_id_p_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."p_organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "p_accounts_user_id_index" ON "p_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "p_sessions_user_id_index" ON "p_sessions" USING btree ("user_id");