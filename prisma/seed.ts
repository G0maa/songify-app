import * as fs from 'fs';
import { parse } from 'csv-parse'; // Currently a dev dependency.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample took about 15 seconds to seed 1000 Records,
// reduced to 100 records to take 3-4 seconds.
// maybe using native postgres client would be faster?
// Entire dataset took: 2 minutes for ~28,000 records.

// Note: Code was generated by ChatGPT,
// got it working after some time.
async function seed() {
  const artists = {};
  const tracks = [];

  const parser = fs
    .createReadStream('./prisma/sample.csv')
    .pipe(parse({ columns: true }));

  for await (const record of parser) {
    const artistName = record.artist_name;

    if (!artists[artistName]) {
      artists[artistName] = await prisma.artist.create({
        data: {
          name: artistName,
        },
      });
    }

    tracks.push({
      title: record.track_name,
      genre: record.genre,
      releaseDate: new Date(record.release_date),
      artistId: artists[artistName].id,
    });
  }
  await prisma.track.createMany({
    data: tracks,
  });

  await prisma.$disconnect();
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    console.log('Seeding Done!');
  });
