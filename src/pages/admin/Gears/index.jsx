import { Box } from "@mui/material";
import { lazy, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Loadable from "../../../components/Loadable";
import Permission from "../../../components/Permission";
import { useGetGears } from "../../../api/gears";
import CreateGears from "./components/CreateGears";
import { GearsColumns } from "../../../tables-def/gears";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const Gears = () => {
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

  const gears = useGetGears({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
  });
  const exportFields = useMemo(() => ["id", "name"], []);
  const total = gears?.data?.data?.pagination?.total || 0;

  return (
    <Permission permission="gear.view">
      <Box>
        <CreateGears />
        <Grid size={12}>
          <TableComponent
            exportFields={exportFields}
            enableTopToolbar
            manualPagination
            enablePagination
            onPaginationChange={setPagination}
            enableFullScreenToggle
            data={gears?.data?.data?.data || []}
            columns={GearsColumns()}
            manualFiltering
            enableGlobalFilter
            onGlobalFilterChange={setGlobalFilter}
            rowCount={total}
            state={{
              isLoading: gears.isLoading,
              globalFilter,
              pagination,
            }}
          />
        </Grid>
      </Box>
    </Permission>
  );
};

export default Gears;
