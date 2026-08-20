import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import Jobs from "./Jobs";
import Gallery from "./Gallery";
import Estimate from "./Estimate";
import Services from "./Services";
import Location from "./Location";
import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import AdminPanel from "./AdminPanel";
import RequireAuth from "../commons/RequireAuth";
import { parseSlug, setCurrentSlug } from "../utils/tenant";
import { apiSegura } from "../utils/utils";
import { API_URL } from "../utils/api";
import { setTenantInfo } from "../state/tenantState";

function AppRoutes() {
  const [value, setValue] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const tenant = useSelector((state: { tenant: TenantInfoState }) => state.tenant);
  const slug = parseSlug(location.pathname);

  useEffect(() => {
    setCurrentSlug(slug);
  }, [slug]);

  useEffect(() => {
    let active = true;
    apiSegura
      .get(`${API_URL}/api/descriptions/`)
      .then((resp) => {
        const rows = resp.data as DescRow[];
        const last = rows[rows.length - 1];
        if (!active || !last) return;
        dispatch(setTenantInfo({ logo: last.link }));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug, dispatch]);

  useEffect(() => {
    let active = true;
    apiSegura
      .get(`${API_URL}/api/tenant`)
      .then((resp) => {
        const data = resp.data as TenantResponse;
        if (!active) return;
        dispatch(
          setTenantInfo({
            colorPrincipal: data.color_principal ?? "",
            colorSecundario: data.color_secundario ?? "",
            telefono: data.telefono ?? "",
            email: data.email ?? "",
            nombre: data.nombre ?? "",
          })
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug, dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    if (tenant.colorPrincipal) {
      root.style.setProperty("--principal", tenant.colorPrincipal);
    }
    if (tenant.colorSecundario) {
      root.style.setProperty("--secundario", tenant.colorSecundario);
    }
    document.title = tenant.nombre || "Calle'$ Construction";
  }, [tenant]);

  const serviceValueHandler = (value: string) => {
    setValue(value);
  };

  const prefix = slug ? `/${slug}` : "";

  return (
    <Routes>
      <Route path={`${prefix}/`} element={<Home />} />
      <Route path={`${prefix}/jobs`} element={<Jobs serv={value} />} />
      <Route path={`${prefix}/gallery`} element={<Gallery />} />
      <Route path={`${prefix}/estimate`} element={<Estimate />} />
      <Route
        path={`${prefix}/services`}
        element={<Services takeValue={serviceValueHandler} />}
      />
      <Route path={`${prefix}/location`} element={<Location />} />
      <Route path={`${prefix}/login`} element={<Login />} />
      <Route path={`${prefix}/landing`} element={<Landing />} />
      <Route path={`${prefix}/register`} element={<Register />} />
      <Route
        path={`${prefix}/admin`}
        element={
          <RequireAuth>
            <AdminPanel />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

interface TenantInfoState {
  colorPrincipal: string;
  colorSecundario: string;
  telefono: string;
  email: string;
  nombre: string;
}

interface DescRow {
  link: string;
}

interface TenantResponse {
  nombre: string;
  telefono?: string;
  email?: string;
  color_principal?: string;
  color_secundario?: string;
}

export default AppRoutes;