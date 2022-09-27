import axios from "axios";

const api = axios.create();

const statusCheck = {
    validateStatus: (status) => {
        if (status === 401) {
            // window.location.reload(true)
        } else {
            return true;
        }
    }
}

function onError(response) {
    return response;
}

function onSuccess(response) {
    return response;
}

// console.log('Auth_Key', Auth_Key)


// api.defaults.headers.common['x-auth-token'] = "4e5613a8215d6f50d4fbb9e351d2c56f"; // 4e5613a8215d6f50d4fbb9e351d2c56f
api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.post["Accept"] = "application/json";

export const dashboardService = {

    getData: data => api.get("https://market-area.herokuapp.com/", statusCheck).then(onSuccess, onError),
    createData: data => api.post("https://market-area.herokuapp.com/add", data, statusCheck).then(onSuccess, onError),
    // fetchBillData: (id) => api.get(`user/getSingleUser/${id}`, statusCheck).then(onSuccess, onError),
    updateData: (data, id) => api.put(`https://market-area.herokuapp.com/${id}`, data, statusCheck).then(onSuccess, onError),
    deleteData: (id) => api.delete(`https://market-area.herokuapp.com/${id}`, statusCheck).then(onSuccess, onError),
};
