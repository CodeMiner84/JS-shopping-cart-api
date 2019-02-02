import {MigrationInterface, QueryRunner} from "typeorm";

export class db1548449740219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `email` text NOT NULL, `password` varchar(255) NOT NULL, `created` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `ean` varchar(50) NOT NULL, `title` varchar(255) NOT NULL, `description` text NOT NULL, `image` varchar(255) NOT NULL, `isActive` tinyint NOT NULL, `price` int NOT NULL, `created` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cart_item` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `productId` int NOT NULL, `quantity` int NOT NULL, `title` varchar(255) NOT NULL, `price` int NOT NULL, `created` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `price` int NOT NULL, `completed` tinyint NOT NULL, `createdAt` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order_item` (`id` int NOT NULL AUTO_INCREMENT, `orderId` int NOT NULL, `productId` int NOT NULL, `price` int NOT NULL, `quantity` int NOT NULL, `amount` int NOT NULL, `title` varchar(255) NOT NULL, `createdAt` datetime NOT NULL, INDEX `IDX_646bf9ece6f45dbe41c203e06e` (`orderId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `cart_item` ADD CONSTRAINT `FK_158f0325ccf7f68a5b395fa2f6a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `cart_item` ADD CONSTRAINT `FK_75db0de134fe0f9fe9e4591b7bf` FOREIGN KEY (`productId`) REFERENCES `product`(`id`)");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_904370c093ceea4369659a3c810`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_646bf9ece6f45dbe41c203e06e0`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_caabe91507b3379c7ba73637b84`");
        await queryRunner.query("ALTER TABLE `cart_item` DROP FOREIGN KEY `FK_75db0de134fe0f9fe9e4591b7bf`");
        await queryRunner.query("ALTER TABLE `cart_item` DROP FOREIGN KEY `FK_158f0325ccf7f68a5b395fa2f6a`");
        await queryRunner.query("DROP INDEX `IDX_646bf9ece6f45dbe41c203e06e` ON `order_item`");
        await queryRunner.query("DROP TABLE `order_item`");
        await queryRunner.query("DROP TABLE `order`");
        await queryRunner.query("DROP TABLE `cart_item`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
