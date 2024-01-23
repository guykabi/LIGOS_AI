import mongoose,{Schema,Model} from 'mongoose' 

export type UserType = {
  fullname:string, 
  email:string,
  password?:string,
  freeUses?:number,
  provider?:[string],
  premium?:boolean,
  image?:string
}

interface UserSchemaType extends Document, UserType{}

type UserModel = Model<UserSchemaType>


const UserSchema:Schema = new Schema<UserSchemaType,UserModel>({
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


const User:UserModel =  mongoose.models.User || mongoose.model<UserSchemaType>('User', UserSchema);

export default User