import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TierSchema = new Schema({
  name: {type: String, required: true},
  cost: {type: Number, required: true},
  projectId: {type: ObjectId, required: true, ref: 'Project'},
  creatorId: {type: ObjectId, required: true, ref: 'Account'}
},
{ timestamps: true, toJSON: { virtuals: true } })

TierSchema.virtual('creator',{
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
