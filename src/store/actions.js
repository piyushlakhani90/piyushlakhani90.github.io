// import { dashboardService } from "../shared/services";

// // for load dashboard data
// export function getDashboardData(data, next) {
//   return (dispatch) => {
//     dispatch({ type: "LOADING", payload: true });

//     dashboardService
//       .BCTeamDashboardTeamData(data)
//       .then((res) => {
//         // dispatch({ type: "LOADING", payload: false });
//         dispatch({ type: "DASHBOARD_TEAM_DATA", payload: res.data.result });
//         next(res.data.result);
//       })
//       .catch((e) => {});
//   };
// }
