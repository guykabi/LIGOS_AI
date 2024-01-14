import mongoose,{Schema} from 'mongoose' 

interface UserSchemaType extends Document{
  fullname:String, 
  email:String,
  password:String,
  freeUses:Number,
  provider:[String],
  premium:Boolean,
  image:String
}


const UserSchema:Schema = new Schema<UserSchemaType>({
  fullname:String, 
  email:{type: String, required: true}, 
  password:String,
  freeUses:Number,
  provider:[String],
  premium:Boolean,
  image:String
},
{timestamps:true}
)


const User =  mongoose.models.User || mongoose.model<UserSchemaType>('User', UserSchema);

export default User