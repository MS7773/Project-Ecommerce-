const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
 name : {
    type : String,
    required : [true, "Name is required"]
 },
 price : {
    type : Number,
    required : true
 },
 image : {
    type : String,
    
 },
 category : {
   type : String
 } ,
 description : {
    type : String
 },
 stock : {
    type :Number,
    default : 0
 },
 discountPercentage : {
    type :Number
 }


})

productSchema.virtual("discountPrice").get(function(){
   return this.price - (this.price * this.discountPercentage/100)
})

productSchema.set('toJSON', {virtuals: true})   //Explanation At down


const Product = mongoose.model('Product',productSchema) ;

module.exports = Product


    // name  ,
    // price  ,
    // image   ,
    // stock   ,
    // description 




//NOTE - Virtual Property:
//? In Mongoose, a virtual is a property that doesn't get persisted (i.e., stored) in the database but is derived from other properties of the document.
//! Virtuals are typically used to compute values based on the document’s existing fields.


//NOTE -  Key Points:
//! Virtuals are not stored in the database but are computed dynamically.
//? By default, virtuals are not part of the JSON representation.
//! Adding productSchema.set('toJSON', { virtuals: true }) ensures that virtual properties (like discountPrice) are included when the document is serialized into JSON, making them accessible in API responses or any JSON-based output.