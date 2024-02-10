import mongoose,{Schema,Model} from 'mongoose' 

export type SubscriptionType = {
  userId:string
  stripeCustomerId:string
  stripeSubscriptionId:string
  stripePriceId:string
  stripePeriodEnd:Date
}

export interface SubscriptionSchemaType extends Document,SubscriptionType{}

type SubscriptionModel = Model<SubscriptionSchemaType>


const SubscriptionSchema:Schema = new Schema<SubscriptionSchemaType,SubscriptionModel>({
  userId:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  stripeCustomerId:String,
  stripeSubscriptionId:String,
  stripePriceId:String,
  stripePeriodEnd:Date
},
{timestamps:true, strict: true, validateBeforeSave: true},
)


const Subscription:SubscriptionModel =  mongoose.models.Subscription || mongoose.model<SubscriptionSchemaType>('Subscription', SubscriptionSchema);

export default Subscription