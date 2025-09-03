import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { generateCsv, mkConfig, download } from "export-to-csv";
import { Box, Button } from "@mui/material";
import { MRT_Localization_AR } from "material-react-table/locales/ar";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { useTranslation } from "react-i18next";

const Table = ({ exportFields, exportConfig, ...props }) => {
  const { t, i18n } = useTranslation();

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    ...exportConfig,
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => {
      const filteredRow = {};

      exportFields?.forEach((field) => {
        if (i18n.language === "ar") {
          const arabicField = `${field}_ar`;
          filteredRow[field] = row.original[arabicField] ?? row.original[field];
        } else {
          filteredRow[field] = row.original[field];
        }
      });

      return filteredRow;
    });

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const { renderRowActions, ...restProps } = props;

  const table = useMaterialReactTable({
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnActions: false,

    enableColumnFilters: false,
    onGlobalFilterChange: props.onGlobalFilterChange,
    enableGlobalFilter: props.manualFiltering ? false : true,
    manualFiltering: props.manualFiltering ?? false,

    enableSorting: false,
    manualSorting: props.manualSorting ?? false,
    enableColumnOrdering: false,

    enablePagination: false,
    manualPagination: props.manualPagination ?? false,
    onPaginationChange: props.onPaginationChange,
    rowCount: props.rowCount,

    state: {
      ...props.state,
    },

    localization:
      i18n.language === "ar" ? MRT_Localization_AR : MRT_Localization_EN,
    muiTableContainerProps: {
      sx: {
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      },
    },
    ...(props.enableExport === false
      ? { enableTopToolbar: false }
      : {
          renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Button
                variant="outlined"
                onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
                }
              >
                {t("table.exportCSV")}
              </Button>
            </Box>
          ),
        }),

    enableRowActions: !!renderRowActions,
    renderRowActions,
    ...restProps,
  });

  return (
    <Box dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default Table;
