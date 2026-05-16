import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import VPN from "./pages/VPN";
import Software from "./pages/Software";
import Tools from "./pages/Tools";
import AI from "./pages/AI";
import Apps from "./pages/Apps";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/vpn"} component={VPN} />
      <Route path={"/logiciels"} component={Software} />
      <Route path={"/outils"} component={Tools} />
      <Route path={"/ia"} component={AI} />
      <Route path={"/applications"} component={Apps} />
      <Route path={"/login"} component={Login} />
      <Route path={"/signup"} component={Signup} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
