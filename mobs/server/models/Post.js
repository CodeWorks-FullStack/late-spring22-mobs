import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  imgUrl: { type: String },
  tierId: { type: ObjectId, ref: 'Tier' },
  projectId: { type: ObjectId, required: true, ref: 'Account' },
  creatorId: { type: ObjectId, required: true, ref: 'Project' }
},
  { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

PostSchema.virtual('tier', {
  localField: 'tierId',
  foreignField: '_id',
  ref: 'Tier',
  justOne: true
})
