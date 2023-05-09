import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'https://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'changeme',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
