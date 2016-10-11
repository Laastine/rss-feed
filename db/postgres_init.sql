CREATE DATABASE "rssfeed";

\connect "rssfeed"

CREATE TABLE "feeds"(
    "feedid" SERIAL PRIMARY KEY NOT NULL,
    "name" varchar(120) NULL,
    "source" varchar(4000) NULL);

INSERT INTO "feeds" ("feedid", "name", "source") VALUES (1, 'RockPaperShotgun', 'http://feeds.feedburner.com/RockPaperShotgun');
INSERT INTO "feeds" ("feedid", "name", "source") VALUES (2, 'Code of Honor', 'http://www.codeofhonor.com/blog/feed');
INSERT INTO "feeds" ("feedid", "name", "source") VALUES (3, 'Lautapeliopas', 'http://www.lautapeliopas.fi/feed/');
