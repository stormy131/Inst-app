import Sequelize, {Model} from 'sequelize';
import seq from '../connection';
import { Comments } from './comments';
import { Posts } from './posts';

interface UserInfo {
    id?: number,
    email: string,
    password: string,
    username: string,
    desc?: string
}

interface UserInstance extends Model<UserInfo>, UserInfo{}

const Users = seq.define<UserInstance>('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING
    }
});

export {
    Users,
    UserInfo
};