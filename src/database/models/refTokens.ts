import Sequelize, { Model } from "sequelize";
import seq from '../connection';

interface RefTokenInfo {
    token: string
}

interface RefTokenInstance extends Model<RefTokenInfo>, RefTokenInfo{}

const RefTokens = seq.define<RefTokenInstance>('reftokens', {
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export {
    RefTokens,
    RefTokenInfo
};