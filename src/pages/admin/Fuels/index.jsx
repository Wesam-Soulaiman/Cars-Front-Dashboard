import { Box } from "@mui/material";
import { lazy, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Loadable from "../../../components/Loadable";
import Permission from "../../../components/Permission";
import { useGetFuels } from "../../../api/fuel";
import CreateFuels from "./components/CreateFuels";
import { FuelsColumns } from "../../../tables-def/fuels";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const Fuels = () => {
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

  const fuels = useGetFuels({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
  });
  const exportFields = useMemo(() => ["id", "name"], []);
  const total = fuels?.data?.data?.pagination?.total || 0;

  return (
    <Permission permission="fuel_type.view">
      <Box>
        <CreateFuels />
        <Grid size={12}>
          <TableComponent
            exportFields={exportFields}
            enableTopToolbar
            manualPagination
            enablePagination
            onPaginationChange={setPagination}
            enableFullScreenToggle
            data={fuels?.data?.data?.data || []}
            columns={FuelsColumns()}
            manualFiltering
            enableGlobalFilter
            onGlobalFilterChange={setGlobalFilter}
            rowCount={total}
            state={{
              isLoading: fuels.isLoading,
              globalFilter,
              pagination,
            }}
          />
        </Grid>
      </Box>
    </Permission>
  );
};

export default Fuels;
