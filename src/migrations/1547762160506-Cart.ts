import {MigrationInterface, QueryRunner} from "typeorm";

export class Cart1547762160506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `cart_item` (`id` int NOT NULL AUTO_INCREMENT, `customerId` int NOT NULL, `productId` int NOT NULL, `quantity` text NOT NULL, `price` varchar(255) NOT NULL, `created` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` CHANGE `created` `created` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `created` `created` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `created` `created` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `created` `created` datetime(0) NOT NULL");
        await queryRunner.query("DROP TABLE `cart_item`");
    }

}
