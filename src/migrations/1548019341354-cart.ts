import {MigrationInterface, QueryRunner} from "typeorm";

export class cart1548019341354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `cart_item` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `quantity` int NOT NULL, `title` varchar(255) NOT NULL, `price` varchar(255) NOT NULL, `created` datetime NOT NULL, `productId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` CHANGE `created` `created` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `created` `created` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `cart_item` ADD CONSTRAINT `FK_158f0325ccf7f68a5b395fa2f6a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `cart_item` ADD CONSTRAINT `FK_75db0de134fe0f9fe9e4591b7bf` FOREIGN KEY (`productId`) REFERENCES `product`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cart_item` DROP FOREIGN KEY `FK_75db0de134fe0f9fe9e4591b7bf`");
        await queryRunner.query("ALTER TABLE `cart_item` DROP FOREIGN KEY `FK_158f0325ccf7f68a5b395fa2f6a`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `created` `created` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `created` `created` datetime(0) NOT NULL");
        await queryRunner.query("DROP TABLE `cart_item`");
    }

}
