// configs/config.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config } from '../schemas/config.schema';

@Injectable()
export class ConfigsService {
  constructor(@InjectModel(Config.name) private configModel: Model<Config>) {}

  async getConfig(): Promise<Config> {
    return this.configModel.findOne();
  }
}
