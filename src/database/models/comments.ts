import Sequelize, {Model} from 'sequelize';
import seq from '../connection';
import { Posts } from './posts';
import { Users } from './users';

interface CommentInfo{
    commentId?: number,
    text: string,
    sender: number,
    fromPost: number
}

interface CommentInstance extends Model<CommentInfo>, CommentInfo{}

const Comments = seq.define<CommentInstance>('comments', {
    commentId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sender: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    fromPost:{
        type: Sequelize.INTEGER,
        references: {
            model: Posts,
            key: 'postId'
        }
    }
});

export {
    Comments,
    CommentInfo
};