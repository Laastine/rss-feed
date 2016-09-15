CREATE DATABASE "rssfeed";

\connect "rssfeed"

CREATE TABLE "feeds"(
    "feedid" SERIAL PRIMARY KEY NOT NULL,
    "name" varchar(120) NULL,
    "description" varchar(4000) NULL);

INSERT INTO "feeds" ("feedid", "name", "description") VALUES (1, 'RockPaperShotgun', 'Duke Nukem is BACK!');
INSERT INTO "feeds" ("feedid", "name", "description") VALUES (2, 'Code blog', 'Learning to code');
INSERT INTO "feeds" ("feedid", "name", "description") VALUES (3, 'Image blog', 'See pictures');