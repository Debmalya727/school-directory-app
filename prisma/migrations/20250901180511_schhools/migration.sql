-- AlterTable
ALTER TABLE `school` MODIFY `hostelFacility` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `admissionStatus` VARCHAR(191) NOT NULL DEFAULT 'Open',
    MODIFY `schoolLevel` VARCHAR(191) NOT NULL DEFAULT 'Senior Secondary',
    MODIFY `averageMonthlyFees` VARCHAR(191) NOT NULL DEFAULT 'N/A',
    MODIFY `transport` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `acClasses` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `indoorSports` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `outdoorSports` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `swimmingPool` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `musicRoom` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `danceRoom` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `gymRoom` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `healthCheckup` BOOLEAN NOT NULL DEFAULT false;
