import { Box } from "@mui/material";
import { lazy, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Loadable from "../../../components/Loadable";
import Permission from "../../../components/Permission";
import { useGetStoreType } from "../../../api/storeType";
import CreateStoreType from "./components/CreateStoreType";
import { StoreTypeColumns } from "../../../tables-def/storeType";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const StoreType = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(globalFilter);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [globalFilter]);

  const storeType = useGetStoreType({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
  });
  const exportFields = useMemo(() => ["id", "name"], []);
  const total = storeType?.data?.data?.pagination?.total || 0;

  return (
    <Permission permission="store_type.view">
      <Box>
        <CreateStoreType />
        <Grid size={12}>
          <TableComponent
            exportFields={exportFields}
            enableTopToolbar
            manualPagination
            enablePagination
            onPaginationChange={setPagination}
            enableFullScreenToggle
            data={storeType?.data?.data?.data || []}
            columns={StoreTypeColumns()}
            manualFiltering
            enableGlobalFilter
            onGlobalFilterChange={setGlobalFilter}
            rowCount={total}
            state={{
              isLoading: storeType.isLoading,
              globalFilter,
              pagination,
            }}
          />
        </Grid>
      </Box>
    </Permission>
  );
};

export default StoreType;
