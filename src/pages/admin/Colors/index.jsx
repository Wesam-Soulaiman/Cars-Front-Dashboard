import { Box } from "@mui/material";
import { lazy, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Loadable from "../../../components/Loadable";
import Permission from "../../../components/Permission";
import CreateColors from "./components/CreateColors";
import { useGetColors } from "../../../api/colors";
import { ColorsColumns } from "../../../tables-def/colors";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const Colors = () => {
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

  const colors = useGetColors({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
  });
  const exportFields = useMemo(() => ["id", "name"], []);
  const total = colors?.data?.data?.pagination?.total || 0;

  return (
    <Permission permission="color.view">
      <Box>
        <CreateColors />
        <Grid size={12}>
          <TableComponent
            exportFields={exportFields}
            enableTopToolbar
            manualPagination
            enablePagination
            onPaginationChange={setPagination}
            enableFullScreenToggle
            data={colors?.data?.data?.data || []}
            columns={ColorsColumns()}
            manualFiltering
            enableGlobalFilter
            onGlobalFilterChange={setGlobalFilter}
            rowCount={total}
            state={{
              isLoading: colors.isLoading,
              globalFilter,
              pagination,
            }}
          />
        </Grid>
      </Box>
    </Permission>
  );
};

export default Colors;
