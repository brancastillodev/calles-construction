import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TenantInfo {
  logo: string;
  colorPrincipal: string;
  colorSecundario: string;
  telefono: string;
  email: string;
  nombre: string;
}

const initialState: TenantInfo = {
  logo: "",
  colorPrincipal: "",
  colorSecundario: "",
  telefono: "",
  email: "",
  nombre: "",
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    setTenantInfo(state, action: PayloadAction<Partial<TenantInfo>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setTenantInfo } = tenantSlice.actions;
export default tenantSlice.reducer;