import {default as Bookshelf} from '../db';
import {default as Thing} from './thing';

var User = Bookshelf.Model.extend({
    tableName: 'users',
    things: function() {
        return this.hasMany(Thing);
    }
});

export default Bookshelf.model('User', User);