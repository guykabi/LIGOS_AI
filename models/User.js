import mongoose,{Schema} from 'mongoose' 

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const UserSchema = new Schema({
  fullname:String, 
  email:{type: String, required: true}, 
  password:{type: String, required:true},
},
{timestamps:true}
)

const User =  mongoose.models.User || mongoose.model('User', UserSchema);

export default User