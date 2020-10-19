import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Reducers } from './reducers'

const persistConfig = {
    key: 'root',
    storage
    // whitelist: ;blacklist:
}

const persistedReducer = persistReducer(persistConfig, Reducers)

const Store = createStore(persistedReducer)
const persistor = persistStore(Store)

export { Store, persistor }

// faça com que redirecione para o /auth sempre que não estiver autenticado e 
// faça o profile