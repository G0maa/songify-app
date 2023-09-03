import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';

// https://github.com/nestjs/elasticsearch | Ctrl + F => "Use class"
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        node: configService.get<string>('ELASTICSEARCH_URL'),
        auth: {
          username: configService.get<string>('ELASTICSEARCH_USERNAME'),
          password: configService.get<string>('ELASTICSEARCH_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false, // because self-signed certificate or other reasons.
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
