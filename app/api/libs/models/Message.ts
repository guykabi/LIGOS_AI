import mongoose,{Schema} from 'mongoose' 

interface MessageSchemaType extends Document{
  userId:string
  service:string
  content:string
}


const MessageSchema:Schema = new Schema<MessageSchemaType>({
  userId:{type:String,required:true}, 
  service:{type:String,required:true},
  content:{type:String,required:true}
},
{timestamps:true}
)


const User =  mongoose.models.User || mongoose.model<MessageSchemaType>('Message', MessageSchema);

export default User