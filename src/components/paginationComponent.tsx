import React from "react";
import { Pagination, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  page: number;
  count: number;
  onChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

const PaginationComponent: React.FC<Props> = ({ page, count, onChange, limit, onLimitChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        count={count}
        page={page}
        onChange={(_e, page) => onChange(page)}
        color="primary"
        sx={{
          backgroundColor: "#fff",
          px: 2,
          py: 1,
          borderRadius: 2,
          boxShadow: 1,
        }}
      />
        <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Items per page</InputLabel>
        <Select
          value={limit}
          label="Items per page"
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {[5, 10, 15, 20, 25].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PaginationComponent;
