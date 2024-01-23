import mongoose,{Schema,Model} from 'mongoose' 


type Service = 'Code' | 'Chat' | 'Image' | 'Video' | 'Music'

export interface MessageSchemaType extends Document{
  userId:string
  service:Service
  content:string
}

type MessageModel = Model<MessageSchemaType>


const MessageSchema:Schema = new Schema<MessageSchemaType,MessageModel>({
  userId:[{ type: Schema.Types.ObjectId, ref: 'User' }], 
  service:{type:String,required:true},
  content:{type:String,required:true}
},
{timestamps:true, strict: true, validateBeforeSave: true},
)


const Message:MessageModel =  mongoose.models.Message || mongoose.model<MessageSchemaType>('Message', MessageSchema);

export default Message