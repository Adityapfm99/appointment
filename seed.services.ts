import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config, ConfigDocument } from './src/config/schemas/config.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(@InjectModel(Config.name) private configModel: Model<ConfigDocument>) {}

  async onModuleInit() {
    const configExists = await this.configModel.findOne();
    if (!configExists) {
      const configFilePath = path.join(__dirname, '..', 'config-seed.json');
      const configData = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

      await this.configModel.create(configData);
      console.log('Configuration initialized');
    } else {
      console.log('Configuration already exists');
    }
  }
}
