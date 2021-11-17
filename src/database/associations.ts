import { Comments } from "./models/comments";
import { Posts } from "./models/posts";
import { Users } from "./models/users";
import {RefTokens} from './models/refTokens';


function createAssociations(){
  RefTokens;

  Users.hasMany(Posts, {
      foreignKey: 'author',
      sourceKey: 'id'
  });
    
  Posts.belongsTo(Users, {
     foreignKey: 'author',
     targetKey: 'id'
  });
    
  Users.hasMany(Comments, {
    foreignKey: 'sender',
    sourceKey: 'id'
  });
    
  Comments.belongsTo(Users, {
    foreignKey: 'sender',
    targetKey: 'id'
  });

  Posts.hasMany(Comments, {
      foreignKey: 'fromPost',
      sourceKey: 'postId'
    });
    
  Comments.belongsTo(Posts, {
    foreignKey: 'fromPost',
    targetKey: 'postId'
  });
};

export default createAssociations;