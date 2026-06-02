BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "app_camere" (
	"id"	INTEGER,
	"category"	TEXT,
	"equipments"	TEXT,
	"description"	TEXT,
	"price"	REAL,
	"stato"	TEXT,
	"images"	TEXT,
	"imagesPath"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "user_role" (
	"id"	INTEGER NOT NULL UNIQUE,
	"user_email"	TEXT,
	"role"	TEXT,
	"key"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "app_camere" VALUES (1,'Camera Giulio','Aria condizionata, mini frigo, bollitore, bagno privato, asciugamani e kit doccia inclusi','Camera tranquilla ed essenziale con letto matrimoniale.',89.0,'disponibile','["giulio-1", "giulio-2", "giulio-3", "giulio-4", "giulio-5", "giulio-6", "giulio-7", "giulio-8", "giulio-9", "giulio-10"]','"giulio-3"');
INSERT INTO "app_camere" VALUES (2,'Camera Eva','Aria condizionata, mini frigo, bollitore, balcone, bagno privato','Camera luminosa e accogliente con divano letto.',129.0,'disponibile','["eva-1", "eva-2", "eva-3", "eva-4", "eva-5", "eva-6", "eva-7", "eva-8", "eva-9", "eva-10"]','"eva-5"');
INSERT INTO "app_camere" VALUES (3,'Camera Aria','Aria condizionata, mini frigo, bollitore, balcone interno','Camera intima e rilassante ideale per il riposo.',119.0,'disponibile','["aria-1", "aria-2", "aria-3", "aria-4", "aria-5", "aria-6", "aria-7", "aria-8", "aria-9", "aria-10"]','"aria-2"');
INSERT INTO "user_role" VALUES (1,'antoinefaith1@gmail.com','admin','your_key_value_here');
COMMIT;
