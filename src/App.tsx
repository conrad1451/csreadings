// src/App.tsx (Updated)

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import CSNotionPages2 from "./apis/CSNotionPages2.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import OldApp from "./components/OldApp.tsx";

// Export NavigationButtons directly as well
export function NavigationButtons() {
  // <--- ADDED 'export' here
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}>
      <Button variant="contained" onClick={() => handleNavigate("/orig")}>
        Go to original page
      </Button>
      <Button
        variant="contained"
        onClick={() => handleNavigate("/compscilearning")}
      >
        Go to career content page
      </Button>
    </Box>
  );
}

// Export the core AppContent separately for testing (as previously suggested)
export function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<NavigationButtons />} />
      <Route path="/orig" element={<OldApp />} />
      <Route path="/compscilearning" element={<CSNotionPages2 />} />
    </Routes>
  );
}

// Default export for the actual application
function AppWithRouter() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default AppWithRouter;
