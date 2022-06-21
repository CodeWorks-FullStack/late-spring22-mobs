import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const SupportSchema = new Schema({
  accountId: { type: ObjectId, ref: 'Account', required: true },
  projectId: { type: ObjectId, ref: 'Project', required: true },
  tierId: { type: ObjectId, ref: 'Tier', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

SupportSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

SupportSchema.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})

SupportSchema.virtual('tier', {
  localField: 'tierId',
  ref: 'Tier',
  foreignField: '_id',
  justOne: true
})

