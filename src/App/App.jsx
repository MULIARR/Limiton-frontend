import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import PortfolioPage from "../pages/Portfolio.jsx";
import SwapPage from "../pages/Swap.jsx";
import OrdersPage from "../pages/Orders.jsx";
import { hapticFeedback, useLaunchParams, miniApp, useSignal } from "@telegram-apps/sdk-react";


function App() {
  miniApp.setBottomBarColor("#07080a");
  miniApp.setHeaderColor("#0b0c0e");

  const handleHapticFeedback = () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("light");
    }
  };

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <div className="relative w-full">
            <div className="absolute top-0 left-0 right-0 mx-auto h-14 bg-card border-x-1 border-b-1 border-cardBorder rounded-b-2xl z-2 w-full sm:w-5/12 lg:w-4/12"></div>
              <nav className="relative z-20 flex justify-center items-center space-x-4 h-14 rounded-3xl w-full sm:w-5/12 lg:w-4/12 mx-auto">

              <NavLink
                to=""
                className={({ isActive }) =>
                  `transition-transform duration-300 ${
                    isActive ? "scale-110 text-blue-500 font-semibold" : "scale-90 text-gray-500"
                  }`
                }
                onClick={handleHapticFeedback}
              >
                Portfolio
              </NavLink>
              <NavLink
                to="/swap"
                className={({ isActive }) =>
                  `transition-transform duration-300 ${
                    isActive ? "scale-110 text-blue-500 font-semibold" : "scale-90 text-gray-500"
                  }`
                }
                onClick={handleHapticFeedback}
              >
                Swap
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `transition-transform duration-300 ${
                    isActive ? "scale-110 text-blue-500 font-semibold" : "scale-90 text-gray-500"
                  }`
                }
                onClick={handleHapticFeedback}
              >
                Orders
              </NavLink>
            </nav>
          </div>
          <Routes>
            <Route path="" element={<PortfolioPage />} />
            <Route path="/swap" element={<SwapPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
