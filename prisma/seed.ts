import { PrismaClient } from '@prisma/client';

import { hashPassword } from 'src/common/helpers/hashPassword';

const prisma = new PrismaClient();

async function main() {
  const passwordJohn = await hashPassword('password123');
  const passwordJane = await hashPassword('securePassword');
  const passwordMichael = await hashPassword('kingofpop');
  const passwordElvis = await hashPassword('theking');
  const passwordLady = await hashPassword('littlemonsters');

  await prisma.user.createMany({
    data: [
      {
        login: 'john_doe',
        password: passwordJohn,
        version: 1,
      },
      {
        login: 'jane_smith',
        password: passwordJane,
        version: 1,
      },
      {
        login: 'michael_jackson',
        password: passwordMichael,
        version: 1,
      },
      {
        login: 'elvis_presley',
        password: passwordElvis,
        version: 1,
      },
      {
        login: 'lady_gaga',
        password: passwordLady,
        version: 1,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.artist.createMany({
    data: [
      {
        id: '8908ad0e-0573-41a6-9dcc-d89dedbba502',
        name: 'Taylor Swift',
        grammy: true,
      },
      {
        id: '8908ad0e-0573-41a6-9dcc-d89dedbba503',
        name: 'Ed Sheeran',
        grammy: true,
      },
      {
        id: '8908ad0e-0573-41a6-9dcc-d89dedbba504',
        name: 'Beyoncé',
        grammy: true,
      },
      {
        id: '8908ad0e-0573-41a6-9dcc-d89dedbba505',
        name: 'Drake',
        grammy: true,
      },
      {
        id: '8908ad0e-0573-41a6-9dcc-d89dedbba506',
        name: 'Adele',
        grammy: true,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.album.createMany({
    data: [
      {
        id: 'd7627b6b-c317-47c5-9055-9a511f12d446',
        name: '1989',
        year: 2014,
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba502',
      },
      {
        id: 'd7627b6b-c317-47c5-9055-9a511f12d447',
        name: '÷ (Divide)',
        year: 2017,
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba503',
      },
      {
        id: 'd7627b6b-c317-47c5-9055-9a511f12d448',
        name: 'Lemonade',
        year: 2016,
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba504',
      },
      {
        id: 'd7627b6b-c317-47c5-9055-9a511f12d449',
        name: 'Views',
        year: 2016,
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba505',
      },
      {
        id: 'd7627b6b-c317-47c5-9055-9a511f12d450',
        name: '21',
        year: 2011,
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba506',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.track.createMany({
    data: [
      {
        id: '7c9c4987-eb82-4502-a164-30ae527f479e',
        name: 'Shake It Off',
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba502',
        albumId: 'd7627b6b-c317-47c5-9055-9a511f12d446',
        duration: 219,
      },
      {
        id: '7c9c4987-eb82-4502-a164-30ae527f47a0',
        name: 'Shape of You',
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba503',
        albumId: 'd7627b6b-c317-47c5-9055-9a511f12d447',
        duration: 233,
      },
      {
        id: '7c9c4987-eb82-4502-a164-30ae527f47a1',
        name: 'Formation',
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba504',
        albumId: 'd7627b6b-c317-47c5-9055-9a511f12d448',
        duration: 226,
      },
      {
        id: '7c9c4987-eb82-4502-a164-30ae527f47a2',
        name: 'One Dance',
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba505',
        albumId: 'd7627b6b-c317-47c5-9055-9a511f12d449',
        duration: 173,
      },
      {
        id: '7c9c4987-eb82-4502-a164-30ae527f47a3',
        name: 'Rolling in the Deep',
        artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba506',
        albumId: 'd7627b6b-c317-47c5-9055-9a511f12d450',
        duration: 228,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.artistInFavorites.createMany({
    data: {
      artistId: '8908ad0e-0573-41a6-9dcc-d89dedbba502',
    },
    skipDuplicates: true,
  });

  await prisma.albumInFavorites.createMany({
    data: {
      albumId: 'd7627b6b-c317-47c5-9055-9a511f12d446',
    },
    skipDuplicates: true,
  });

  await prisma.trackInFavorites.createMany({
    data: {
      trackId: '7c9c4987-eb82-4502-a164-30ae527f47a0',
    },
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
