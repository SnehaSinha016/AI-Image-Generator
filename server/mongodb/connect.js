import mongoose from "mongoose";
const connectDB=(url)=>{
    mongoose.set('strictQuery',true);
    return mongoose.connect(url)
    .then(()=>console.log('MongoDB Connected'))
    .catch((err)=>{
        console.log(err)
        process.exit(1);
});
    
}
export default connectDB;