-- AlterTable
ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;
ALTER TABLE "User" ADD COLUMN "roleCategory" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RegistrationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "roleCategory" TEXT NOT NULL,
    "jobTitle" TEXT,
    "phone" TEXT,
    "useCase" TEXT NOT NULL,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "privacyAcceptedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "usedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_RegistrationRequest" (
    "id", "email", "tokenHash", "firstName", "lastName", "company", "roleCategory",
    "jobTitle", "phone", "useCase", "marketingConsent", "privacyAcceptedAt",
    "expiresAt", "usedAt", "createdAt"
)
SELECT
    "id", "email", "tokenHash", "name", '', "company", 'OTHER',
    "jobTitle", "phone", "useCase", "marketingConsent", "privacyAcceptedAt",
    "expiresAt", "usedAt", "createdAt"
FROM "RegistrationRequest";
DROP TABLE "RegistrationRequest";
ALTER TABLE "new_RegistrationRequest" RENAME TO "RegistrationRequest";
CREATE UNIQUE INDEX "RegistrationRequest_tokenHash_key" ON "RegistrationRequest"("tokenHash");
CREATE INDEX "RegistrationRequest_email_createdAt_idx" ON "RegistrationRequest"("email", "createdAt");
CREATE INDEX "RegistrationRequest_expiresAt_idx" ON "RegistrationRequest"("expiresAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
