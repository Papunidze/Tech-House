import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginations({ count, setPage }) {
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        defaultPage={1}
        siblingCount={0}
        onChange={handleChange}
      />
    </Stack>
  );
}
