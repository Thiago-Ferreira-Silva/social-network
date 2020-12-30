import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Reducers } from './reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'userState' ]
}

const persistedReducer = persistReducer(persistConfig, Reducers)

const Store = createStore(persistedReducer)
const persistor = persistStore(Store)

export { Store, persistor }

//tente melhorar a store; os reducers estão grandes e com apenas uma função para cada
//aprenda a usar melhor o redux
//transforme actions e reducers em arquivos únicos ao invés de pastas