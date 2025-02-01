import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import gptReducer from "./features/gpt/gptSlice";
import cartReducer from "./features/cart/cartSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import popupReducer from "./features/popup/popupSlice";
import bookingsSlice from "./features/bookCourtRoom/selectedDatesTimesSlice";
import splashReducer from "./features/bookCourtRoom/splashSlice";
import userSlice from "./features/bookCourtRoom/LoginReducreSlice";
import bookingReducer from "./features/bookCourtRoom/bookingSlice";
import courtroomAdminAddUserSlice from "./features/admin/courtroomAdminAddUserSlice";
import allowedBookingReducer from "./features/admin/allowedBookingSlice";
import lawSlice from "./features/laws/lawSlice";
import drafterSlice from "./features/laws/drafterSlice";
import drafterProSlice from "./features/laws/drafterProSlice";
import toggleSlice from "./features/toggle/toggleSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// const persistConfigure = {
//   key: "root",
//   version: 1,
//   blacklist: [""],
//   storage,
// };

// const reducer = combineReducers({
//   auth: authReducer,
//   gpt: gptReducer,
//   cart: cartReducer,
//   sidebar: sidebarReducer,
//   popup: popupReducer,
//   bookings: bookingsSlice,
//   splash: splashReducer,
//   user: userSlice,
//   booking: bookingReducer,
//   courtroomAdminAddUser: courtroomAdminAddUserSlice,
//   allowedBooking: allowedBookingReducer, // Add to the store
//   laws: lawSlice,
//   drafter: drafterSlice,
//   drafterPro: drafterProSlice,
//   toggle: toggleSlice,
// });

// const persistedReducer = persistReducer(persistConfigure, reducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export default store;

export default configureStore({
  reducer: {
    auth: authReducer,
    gpt: gptReducer,
    cart: cartReducer,
    sidebar: sidebarReducer,
    popup: popupReducer,
    bookings: bookingsSlice,
    splash: splashReducer,
    user: userSlice,
    booking: bookingReducer,
    courtroomAdminAddUser: courtroomAdminAddUserSlice,
    allowedBooking: allowedBookingReducer, // Add to the store
    laws: lawSlice,
    drafter: drafterSlice,
    drafterPro: drafterProSlice,
    toggle: toggleSlice,
  },
});
