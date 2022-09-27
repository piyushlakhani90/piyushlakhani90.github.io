import { dashboardService } from "../shared/service";

// get data
export function getBillData(next) {
    return (dispatch) => {
        dispatch({ type: "LOADING", payload: true });

        dashboardService
            .getData()
            .then((res) => {
                // dispatch({ type: "LOADING", payload: false });
                dispatch({ type: "GET_DATA", payload: res.data });
                next(res.data);
            })
            .catch((e) => { });
    };
}

// add data
export function createFormData(data, next) {
    return (dispatch) => {
        dispatch({ type: "LOADING", payload: true });

        dashboardService
            .createData(data)
            .then((res) => {
                // dispatch({ type: "LOADING", payload: false });
                dispatch({ type: "ADD_DATA", payload: res.data });
                next(res.data);
            })
            .catch((e) => { });
    };
}

//UPDATE data

export function updateFormData(data, id, next) {
    return (dispatch) => {
        dispatch({ type: "LOADING", payload: true });

        dashboardService
            .updateData(data, id)
            .then((res) => {
                // dispatch({ type: "LOADING", payload: false });
                dispatch({ type: "UPDATE_DATA", payload: res.data });
                next(res.data);
            })
            .catch((e) => { });
    };
}

//delete data
export function deleteBillData(id, next) {
    return (dispatch) => {
        dispatch({ type: "LOADING", payload: true });

        dashboardService
            .deleteData(id)
            .then((res) => {
                // dispatch({ type: "LOADING", payload: false });
                dispatch({ type: "DELETE_DATA", payload: res.data });
                next(res.data);
            })
            .catch((e) => { });
    };
}