//assign mongoose to variable
import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true //validation the name is must fill then the backend check and execute
    },
    discount : {
        type : Number,
        required: true
    },
    date : {
        type : Date,
        required: true
    },
    image : {
        type : String,
        required: true
    }
});

//create table in database what value inserted
const PromotionModel = mongoose.models.promotion || mongoose.model('Promotion', promotionSchema); //firtst value use to to database document(table name) second name use to declated variable name

//export module to use in the routed
export default PromotionModel;
