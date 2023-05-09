import { Client } from '@elastic/elasticsearch';
import * as fs from 'fs';
import { parse } from 'csv-parse'; // Currently a dev dependency.

const esClient = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'D*qLL36vuaSwHDAlyPjE',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function run() {
  const tracks = [];
  const parser = fs
    .createReadStream('./prisma/sample.csv')
    .pipe(parse({ columns: true }));

  const esInfo = await esClient.info();
  console.log(esInfo);

  // This solution will easily get out of hand:
  // Imagine you need to access artist profile from track search result,
  // ElasticSearch doesn't contain artistId & can't possibly know it*.
  let id = 1;
  for await (const record of parser) {
    tracks.push({
      id: id++,
      title: record.track_name,
      genre: record.genre,
      releaseDate: new Date(record.release_date),
      artist: { name: record.artist_name },
      duration: record.len,
    });
  }

  const isExist = await esClient.indices.exists({ index: 'tracks' });

  if (isExist) await esClient.indices.delete({ index: 'tracks' });
  await esClient.indices.create({ index: 'tracks' });

  // to-do: do correct mapping & use of bulk.
  for (const track of tracks) {
    await esClient.create({ index: 'tracks', id: track.id, body: track });
  }
}
run().catch(console.log);
