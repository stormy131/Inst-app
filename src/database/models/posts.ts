import Sequelize, {Model} from 'sequelize';
import seq from '../connection';
import { Comments } from './comments';
import { Users } from './users';

interface PostInfo {
    postId?: number,
    photoPath: string,
    label: string,
    author?: number
}

interface PostInstance extends Model<PostInfo>, PostInfo{}

const Posts = seq.define<PostInstance>('posts', {
    postId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    photoPath:{
        type: Sequelize.STRING,
        allowNull: false
    },
    label: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    }
});

Posts.hasMany(Comments, {
    foreignKey: 'fromPost',
    sourceKey: 'postId'
  });

Comments.belongsTo(Posts, {
  foreignKey: 'fromPost',
  targetKey: 'postId'
});

export {
    Posts,
    PostInfo
};