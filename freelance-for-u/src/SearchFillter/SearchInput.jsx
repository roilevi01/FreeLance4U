import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchInput = ({ value, onChange, onClear, isLoading }) => {
  return (
    <TextField
      fullWidth
      label="Search"
      variant="outlined"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {isLoading ? (
              <CircularProgress size={20} thickness={5} />
            ) : (
              value && (
                <IconButton onClick={onClear} edge="end">
                  <ClearIcon />
                </IconButton>
              )
            )}
          </InputAdornment>
        ),
      }}
      sx={{
        marginBottom: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default SearchInput;
