import { lazy, useEffect, useMemo, useState } from "react";
import { Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { gridSpacing } from "../../../config";
import Loadable from "../../../components/Loadable";
import Permission from "../../../components/Permission";
import CreateStructures from "./CreateStructures";
import { useGetStructures } from "../../../api/structures";
import { StructuresColumns } from "../../../tables-def/structures";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);
const Structures = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(globalFilter);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [globalFilter]);

  const structures = useGetStructures({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
  });

  const exportFields = useMemo(() => ["id", "name"], []);
  const data = structures?.data?.data?.data || [];
  const total = structures?.data?.data?.pagination?.total || 0;
  return (
    <Permission permission="structure.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="structure.create">
            <CreateStructures />
            <Grid size={12}>
              <Divider />
            </Grid>
          </Permission>

          <Grid size={12}>
            <TableComponent
              exportFields={exportFields}
              data={data || []}
              columns={StructuresColumns()}
              state={{
                isLoading: structures.isLoading,
                globalFilter,
                pagination,
              }}
              enablePagination
              manualPagination
              onPaginationChange={setPagination}
              manualFiltering
              enableGlobalFilter
              onGlobalFilterChange={setGlobalFilter}
              enableTopToolbar
              rowCount={total}
              enableFullScreenToggle
            />
          </Grid>
        </Grid>
      </Box>
    </Permission>
  );
};

export default Structures;
