import {MigrationInterface, QueryRunner} from "typeorm";

export class order1548363248377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `price` int NOT NULL, `completed` tinyint NOT NULL, `createdAt` datetime NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order_item` (`id` int NOT NULL AUTO_INCREMENT, `price` int NOT NULL, `quantity` int NOT NULL, `amount` int NOT NULL, `title` varchar(255) NOT NULL, `createdAt` datetime NOT NULL, `orderId` int NULL, `productId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` CHANGE `created` `created` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `created` `created` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `cart_item` DROP FOREIGN KEY `FK_158f0325ccf7f68a5b395fa2f6a`");
        await queryRunner.query("ALTER TABLE `cart_item` DROP FOREIGN KEY `FK_75db0de134fe0f9fe9e4591b7bf`");
        await queryRunner.query("ALTER TABLE `cart_item` CHANGE `userId` `userId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `cart_item` CHANGE `productId` `productId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `cart_item` DROP COLUMN `price`");
        await queryRunner.query("ALTER TABLE `cart_item` ADD `price` int NOT NULL");
        await queryRunner.query("ALTER TABLE `cart_item` CHANGE `created` `created` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `cart_item` ADD CONSTRAINT `FK_158f0325ccf7f68a5b395fa2f6a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `cart_item` ADD CONSTRAINT `FK_75db0de134fe0f9fe9e4591b7bf` FOREIGN KEY (`productId`) REFERENCES `product`(`id`)");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE SET NULL");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_904370c093ceea4369659a3c810`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_646bf9ece6f45dbe41c203e06e0`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_caabe91507b3379c7ba73637b84`");
        await queryRunner.query("ALTER TABLE `cart_item` DROP FOREIGN KEY `FK_75db0de134fe0f9fe9e4591b7bf`");
        await queryRunner.query("ALTER TABLE `cart_item` DROP FOREIGN KEY `FK_158f0325ccf7f68a5b395fa2f6a`");
        await queryRunner.query("ALTER TABLE `cart_item` CHANGE `created` `created` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `cart_item` DROP COLUMN `price`");
        await queryRunner.query("ALTER TABLE `cart_item` ADD `price` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `cart_item` CHANGE `productId` `productId` int NULL");
        await queryRunner.query("ALTER TABLE `cart_item` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `cart_item` ADD CONSTRAINT `FK_75db0de134fe0f9fe9e4591b7bf` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `cart_item` ADD CONSTRAINT `FK_158f0325ccf7f68a5b395fa2f6a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `product` CHANGE `created` `created` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `created` `created` datetime(0) NOT NULL");
        await queryRunner.query("DROP TABLE `order_item`");
        await queryRunner.query("DROP TABLE `order`");
    }

}
