Yii tutorial.php


1. Database migrations
1.1  Creating migrations
Tag
php yii migrate/create create_tag_table

Category
php yii migrate/create create_category_table

Post
php yii migrate/create create_post_table

PostTag
php yii migrate/create create_post_tag_table

<?php
use yii\db\Migration;
class m150906_141330_create_post_tag_table extends Migration
{
    public function up()
    {
        $this->createTable('post_tag', [
            'id' => $this->primaryKey(),
            'post_id' => $this->integer()->notNull(),
            'tag_id' => $this->integer()->notNull()
        ]);

        $this->createIndex('post_tag_index', 'post_tag', ['post_id', 'tag_id']);
        $this->addForeignKey('fk_post_tag_post', 'post_tag', 'post_id', 'post', 'id', 'CASCADE', 'CASCADE');
        $this->addForeignKey('fk_post_tag_tag', 'post_tag', 'tag_id', 'tag', 'id', 'CASCADE', 'CASCADE');
    }

    public function down()
    {
        $this->dropForeignKey('fk_post_tag_post', 'post_tag');
        $this->dropForeignKey('fk_post_tag_tag', 'post_tag');
        $this->dropTable('post_tag');
    }
}
?>


1.2  Applying migrations

php yii migrate/up 


1.3  RBAC (Role-Based Access Control) tables migration

To configure authManager to work with DbManager we must add this code to common/config/main.php:

'components' => [
    // ... other components
    'authManager' => [
        'class' => 'yii\rbac\DbManager',
    ],
    // ... other components
],
After setting up the authManager we can now run RBAC migration:

php yii migrate --migrationPath=@yii/rbac/migrations
























