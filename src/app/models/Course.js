const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: {type: Number,},
        name: {type: String, required: true, },
        description: {type: String, },
        image: {type: String, },
        videoId: {type: String, required: true, },
        level: {type: String, },
        slug: { type: String, slug: 'name', unique:true},
        // author: ObjectId,
        // title: String,
        // body: String,
        // date: Date
    },
    {
        _id: false,
        timestamps: true,
    }
);




// const AccountModel = mongoose.model('Admin',AccountSchema)

//custom query helpers
CourseSchema.query.sortable = function(req){
    if(req.query.hasOwnProperty('_sort')){    //nhảy giá trị theo icon
        const isValidtype = ['asc','desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type :'desc',
         });
    }
    return this;
}

//Add plugins
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all' });

module.exports = mongoose.model('Course', CourseSchema);
// module.exports = AccountModel;