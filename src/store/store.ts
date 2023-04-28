import { tokenReducer } from "./tokens/tokensReducer";


const store = createStore(tokenReducer);

export default store;

function createStore(tokenReducer: any) {
    throw new Error("Function not implemented.");
}
