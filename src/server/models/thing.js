import {default as Bookshelf} from '../db';
import {default as User} from './user';
var Thing = Bookshelf.Model.extend({
    tableName: 'things'
});

export default Bookshelf.model('Thing', Thing);