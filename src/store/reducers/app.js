const initialState = {
    sidebarShow: true,
    unfoldable: false,
    addData: null,
    getData: null,
    updateData: null,
    deleteData: null
}

export const app = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }

        case 'ADD_DATA':
            return {
                ...state,
                addData: rest.payload
            }

        case 'GET_DATA':
            return {
                ...state,
                getData: rest.payload
            }

        case 'UPDATE_DATA':
            return {
                ...state,
                updateData: rest.payload
            }

        case 'DELETE_DATA':
            return {
                ...state,
                deleteData: rest.payload
            }
        default:
            return state
    }
}