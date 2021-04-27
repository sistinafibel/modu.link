import { ConnectionOptions } from 'typeorm';

export const dbConnection: ConnectionOptions = {
  type: 'postgres',
  host: String(process.env.DB_HOST),
  port: 5432,
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_TABLE_NAME),
  synchronize: true, // 스키마의 테이블 / 컬럼 변경 -- 테스트 환경에서만 사용할 것
  logging: false,
  entities: ['src/entity/**/*.ts'], // 테이블 & 컬럼 :: 생성 연결에 사용되며 로드되는 entity. 설정한 entity class와 로드하기 위한 directory path를 허용
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
  extra: {
    connectionLimit: 20, // 사용자 지정 커넥션 풀
  },
};
