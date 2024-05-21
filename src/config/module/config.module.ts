// configs/config.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsService } from '../services/config.service';
import { Config, ConfigSchema } from '../schemas/config.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }])],
  providers: [ConfigsService],
  exports: [ConfigsService, MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }])],  
})
export class ConfigsModule {}
