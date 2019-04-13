import React from 'react'
import { Stitch, StitchUser, StitchAppClient, UserPasswordCredential, RemoteMongoDatabase, RemoteMongoClient, StitchAuth } from 'mongodb-stitch-react-native-sdk'

export const stitch = Stitch.initializeAppClient('petcomputer-mpyuf')
export const db = (client: StitchAppClient) => client.getServiceClient(RemoteMongoClient.factory, 'petcomputer').db('petcomputer')

export const StitchContext = React.createContext<{
  user: StitchUser,
  db: RemoteMongoDatabase
}>({
  user: undefined,
  db: undefined
})