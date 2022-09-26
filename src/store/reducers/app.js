const initialState = {
    sidebarShow: true,
    unfoldable: false
}

export const app = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}