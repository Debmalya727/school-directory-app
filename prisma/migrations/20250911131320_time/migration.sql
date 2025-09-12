-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `image` TEXT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `board` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `schoolType` VARCHAR(191) NOT NULL,
    `admissionStatus` VARCHAR(191) NOT NULL DEFAULT 'Open',
    `schoolLevel` VARCHAR(191) NOT NULL DEFAULT 'Senior Secondary',
    `averageMonthlyFees` VARCHAR(191) NOT NULL DEFAULT 'N/A',
    `hostelFacility` BOOLEAN NOT NULL DEFAULT false,
    `transport` BOOLEAN NOT NULL DEFAULT false,
    `acClasses` BOOLEAN NOT NULL DEFAULT false,
    `indoorSports` BOOLEAN NOT NULL DEFAULT false,
    `outdoorSports` BOOLEAN NOT NULL DEFAULT false,
    `swimmingPool` BOOLEAN NOT NULL DEFAULT false,
    `musicRoom` BOOLEAN NOT NULL DEFAULT false,
    `danceRoom` BOOLEAN NOT NULL DEFAULT false,
    `gymRoom` BOOLEAN NOT NULL DEFAULT false,
    `healthCheckup` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `School_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_email_token_key`(`email`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
