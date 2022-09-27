const loaderState = {
    loader: false,
};

export default function loader(state = loaderState, action) {
    switch (action.type) {
        case "LOADING": {
            return { ...state, loader: action.payload };
        }
        default:
            return state;
    }
}
