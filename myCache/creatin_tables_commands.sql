CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS accounts(
	account_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users(
	user_id uuid DEFAULT uuid_generate_v4() NOT NULL UNIQUE PRIMARY KEY,
	account_id uuid NOT NULL,
	display_name VARCHAR(255) NOT NULL,
	about VARCHAR(500),
	
	CONSTRAINT fk FOREIGN KEY (account_id) REFERENCES accounts (account_id)
);


CREATE TABLE IF NOT EXISTS "groups"(
	group_name VARCHAR(20) PRIMARY KEY UNIQUE NOT NULL,
	creator_id uuid NOT NULL,
	description VARCHAR(500),
	is_public BOOLEAN DEFAULT true,
	is_members_only BOOLEAN DEFAULT false,
	
	CONSTRAINT fk FOREIGN KEY (creator_id) REFERENCES accounts (account_id)
);




CREATE TABLE IF NOT EXISTS membership(
	account_id uuid UNIQUE NOT NULL,
	group_name VARCHAR(20) NOT NULL,
	joinedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS posts(
	post_id uuid UNIQUE PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
	created_by uuid NOT NULL UNIQUE,
	group_name VARCHAR(20) NOT NULL UNIQUE,
	title VARCHAR(300) NOT NULL,
	body VARCHAR(40000) NOT NULL,
	"type" VARCHAR(25) NOT NULL,
	likes INTEGER NOT NULL DEFAULT 0,
	dislikes INTEGER NOT NULL DEFAULT 0,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,	
	CONSTRAINT FK1 FOREIGN KEY (created_by) REFERENCES accounts (account_id),
	CONSTRAINT FK2 FOREIGN KEY (group_name) REFERENCES "groups" (group_name),
	CONSTRAINT CHK_MIN_LEN_BODY CHECK(LENGTH(body) >= 20),
	CONSTRAINT CHK_MIN_LEN_TITLE CHECK(LENGTH(title) >= 3)
);


CREATE TABLE IF NOT EXISTS group_contains_post(
	group_name VARCHAR(20) NOT NULL UNIQUE,
	post_id uuid NOT NULL UNIQUE,
	CONSTRAINT FK1 FOREIGN KEY (group_name) REFERENCES "groups" (group_name),
	CONSTRAINT FK2 FOREIGN KEY (post_id) REFERENCES posts (post_id)
);

CREATE TABLE IF NOT EXISTS "comments"(
	comment_id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4() PRIMARY KEY,
	created_by uuid NOT NULL UNIQUE,
	body VARCHAR(1000) NOT NULL,
	likes INTEGER NOT NULL DEFAULT 0,
	dislikes INTEGER NOT NULL DEFAULT 0,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK1 FOREIGN KEY (created_by) REFERENCES accounts (account_id),
	CONSTRAINT MIN_BODY_LENGTH CHECK(LENGTH(body) >= 3)
);

CREATE TABLE IF NOT EXISTS post_contains_comment(
	group_name VARCHAR(20) NOT NULL UNIQUE,
	comment_id uuid NOT NULL UNIQUE,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK1 FOREIGN KEY (group_name) REFERENCES "groups" (group_name),
	CONSTRAINT FK2 FOREIGN KEY (comment_id) REFERENCES "comments" (comment_id)
);

CREATE TABLE IF NOT EXISTS "admins"(
	admin_id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4() PRIMARY KEY,
	"name" VARCHAR(25) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS reports(
	report_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	reporter uuid NOT NULL,
	reportee uuid NOT NULL,
	"type" VARCHAR(25) NOT NULL,
	title VARCHAR(30) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	CONSTRAINT FK1 FOREIGN KEY (reporter) REFERENCES accounts (account_id),
	CONSTRAINT FK2 FOREIGN KEY (reportee) REFERENCES accounts (account_id)
);

CREATE TABLE IF NOT EXISTS moderates(
	mod_id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4() PRIMARY KEY,
	account_id uuid NOT NULL,
	group_name VARCHAR(20) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK1 FOREIGN KEY (account_id) REFERENCES accounts (account_id),
	CONSTRAINT FK2 FOREIGN KEY (group_name) REFERENCES "groups" (group_name)
);

CREATE TABLE IF NOT EXISTS reviews(
	review_id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4() PRIMARY KEY,
	admin_id uuid NOT NULL,
	report_id uuid NOT NULL,
	remarks VARCHAR(500) NOT NULL,
	viewed BOOLEAN DEFAULT false,
	CONSTRAINT FK1 FOREIGN KEY (admin_id) REFERENCES admins (admin_id),
	CONSTRAINT FK2 FOREIGN KEY (report_id) REFERENCES reports (report_id)
);