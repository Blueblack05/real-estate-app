import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import {
  AccountCircleOutlined,
  Chat,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
  Dashboard,
} from "@mui/icons-material";

import { ThemedLayoutV2 } from "./components/themedLayout";
import { ThemedHeaderV2 } from "./components/themedLayout/header";
import { ThemedSiderV2 } from "./components/themedLayout/sider";
import { ThemedTitleV2 } from "./components/themedLayout/title";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { CredentialResponse } from "./interfaces/google";

import {
  Login,
  Home,
  Agents,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  AgentProfile,
  EditProperty,
} from "./pages";

import { parseJwt } from "./utils/parse-jwt";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { profile } from "console";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      // If profileObj is null, immediately return a rejected promise.
      if (!profileObj) {
        return Promise.reject({
          success: false,
          message: "Profile object is null.",
        });
      }

      // Save user to mongoDB...
      const response = await fetch(
        "https://real-estate-website-riap.onrender.com/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
            userid: data._id,
          })
        );
      } else {
        return Promise.reject(new Error(data.message || "Network error"));
      }

      localStorage.setItem("token", `${credential}`);

      return Promise.resolve({
        success: true,
        redirectTo: "/dashboard",
      });
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider(
              "https://real-estate-website-riap.onrender.com/api/v1"
            )}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={[
              {
                name: "dashboard",
                list: "home",
                options: { label: "Dashboard" },
                icon: <Dashboard />,
              },
              {
                name: "properties",
                list: AllProperties,
                show: PropertyDetails,
                create: CreateProperty,
                edit: EditProperty,
                icon: <VillaOutlined />,
              },
              {
                name: "agent",
                list: Agents,
                show: AgentProfile,
                icon: <PeopleAltOutlined />,
              },
              {
                name: "review",
                list: Home,
                icon: <StarOutlineRounded />,
              },
              {
                name: "message",
                list: Home,
                icon: <Chat />,
              },
              {
                name: "my-profile",
                list: MyProfile,
                options: { label: "My Profile" },
                icon: <AccountCircleOutlined />,
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "t4mKyV-tcuOGf-rXS2d0",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={ThemedHeaderV2}
                      Sider={ThemedSiderV2}
                      Title={ThemedTitleV2}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="Dashboard" />}
                />
                <Route path="/home" element={<Home />}></Route>
                <Route path="/properties">
                  <Route index element={<AllProperties />} />
                  <Route path="create" element={<CreateProperty />} />
                  <Route path="edit/:id" element={<EditProperty />} />
                  <Route path="show/:id" element={<PropertyDetails />} />
                </Route>
                <Route path="/agent">
                  <Route index element={<Agents />} />
                  <Route path="show/:id" element={<AgentProfile />} />
                </Route>
                <Route path="/my-profile" element={<MyProfile />}></Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
