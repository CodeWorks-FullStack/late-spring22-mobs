import mongoose from 'mongoose';
import { AccountSchema, ProfileSchema } from '../models/Account';
import { PostSchema } from '../models/Post';
import { ProjectSchema } from '../models/Project';
import { TierSchema } from '../models/Tier';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Projects = mongoose.model('Project', ProjectSchema)
  Posts = mongoose.model('Post', PostSchema)
  Tiers = mongoose.model('Tier', TierSchema)
}

export const dbContext = new DbContext()
