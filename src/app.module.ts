import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MorganMiddleware } from './common/middleware/morgan.middleware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { SearchModule } from './search/search.module';
import { RequsetLoggerMiddleware } from './common/middleware/reguestLogger.middleware';
import { HistoryModule } from './history/history.module';
import { TrendModule } from './trend/trend.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';

// Mhm... should the ConfigModule be global?
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    TrackModule,
    SearchModule,
    HistoryModule,
    TrendModule,
    FavoriteModule,
    ElasticsearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // to-do will eventually need to use winston
    consumer.apply(MorganMiddleware, RequsetLoggerMiddleware).forRoutes('*');
  }
}
