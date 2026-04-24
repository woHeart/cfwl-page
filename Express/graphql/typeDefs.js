export const typeDefs = `#graphql
  type MusicItem {
    id: Int
    gameId: Int
    envType: Int
    title: String
    shortTitle: String
    desc: String
    collectionId: Int
    status: Int
    onlineTime: String
    offlineTime: String
    musicUrl: String
    bigCoverUrl: String
    smallCoverUrl: String
    weight: Int
  }

  type Query {
    getAllMusic: [MusicItem]!
  }
`;