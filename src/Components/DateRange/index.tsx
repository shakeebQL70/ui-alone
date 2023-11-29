import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { addDays, format, subMonths } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Box,
  Divider,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CustomButton } from "../Buttons";

interface IDateRangePicker {
  selectedRange: {
    value: string;
    to: string;
    from: string;
  };
  setSelectedRange: (...props: any) => void;
}
const currentDate = new Date(); // Get the current date
const previousMonthDate = subMonths(currentDate, 1);
const formattedDate = format(previousMonthDate, "yyyy-MM-dd"); // Format it as you need

const pastMonth = new Date(formattedDate);
const defaultSelected: DateRange = {
  from: pastMonth,
  to: addDays(pastMonth, 4),
};

const preSelectedRange = `${format(
  defaultSelected.from as Date,
  "yyyy-MM-dd"
)}-${format(defaultSelected.to as Date, "yyyy-MM-dd")}`;

export default function DateRangePicker(props: IDateRangePicker) {
  const dateRangeContainer = useRef<HTMLDivElement | null>(null);
  const rangeInputRef = useRef<HTMLButtonElement | null>(null);
  const { selectedRange, setSelectedRange } = props;

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const [left, setLeft] = useState(0);

  const handleApply = () => {
    if (range?.from) {
      if (!range.to) {
        setSelectedRange({
          from: format(range.from, "yyyy-MM-dd"),
        });
      } else if (range.to) {
        const v = `${format(range.from, "yyyy-MM-dd")}-${format(
          range.to,
          "yyyy-MM-dd"
        )}`;
        setSelectedRange({
          value: v,
          from: format(range.from, "yyyy-MM-dd"),
          to: format(range.to, "yyyy-MM-dd"),
        });
      }
    }
  };

  const handleClear = () => {
    setSelectedRange({
      value: preSelectedRange,
      to: format(defaultSelected.to as Date, "yyyy-MM-dd"),
      from: format(defaultSelected.from as Date, "yyyy-MM-dd"),
    });
  };

  useLayoutEffect(() => {
    if (dateRangeContainer?.current && rangeInputRef.current) {
      const buttonRect: DOMRect = rangeInputRef.current.getBoundingClientRect();
      const contentRect = dateRangeContainer.current.getBoundingClientRect();
      const innerWidth = window.innerWidth;
      document.body.style.overflow = "hidden";
      const calenderWidth = contentRect.width;
      if (buttonRect.left + calenderWidth > innerWidth) {
        const l = buttonRect.right - calenderWidth;
        setLeft(l);
      } else {
        const l = buttonRect.left;
        setLeft(l);
      }
    }
    if (!displayDatePicker) {
      document.body.style.overflow = "auto";
    }
  }, [displayDatePicker, rangeInputRef?.current]);

  return (
    <Box mb={"1rem"}>
      {displayDatePicker && (
        <Box
          position={"absolute"}
          sx={{
            inset: 0,
            backgroundColor: "transparent",
            zIndex: 99998,
          }}
          onClick={() => setDisplayDatePicker(false)}
        />
      )}
      <InputLabel
        sx={{
          textTransform: "uppercase",
          fontSize: "0.875rem",
          mb: "0.2rem",
          visibility: "hidden",
        }}
      >
        {""}
      </InputLabel>
      <TextField
        sx={{ width: "100%" }}
        type="text"
        value={selectedRange.value || preSelectedRange}
        variant="outlined"
        size="small"
        InputProps={{
          readOnly: true,
          startAdornment: (
            <Typography px={"0.5rem"} component={"div"}>
              <CalendarMonthIcon />
            </Typography>
          ),
          ref: rangeInputRef,
          endAdornment: (
            <Typography px={"0.5rem"} component={"div"}>
              <KeyboardArrowDownIcon />
            </Typography>
          ),
          sx: {
            px: "05px",
          },
        }}
        onFocus={() => setDisplayDatePicker((prev) => !prev)}
      />

      {displayDatePicker && (
        <Paper
          elevation={1}
          sx={{
            maxWidth: "fit-content",
            py: "1rem",
            my: "0.5rem",
            position: "absolute",
            zIndex: 99999,
            left: `${left}px`,
          }}
          component={"div"}
          ref={dateRangeContainer}
        >
          <DayPicker
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
          />
          <Divider />
          <Box px={"1rem"} pt="1rem">
            <Grid
              container
              justifyContent={"space-between"}
              alignContent={"center"}
            >
              <Grid item>
                <Typography>
                  {selectedRange.value || preSelectedRange}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container gap={"10px"}>
                  <Grid item>
                    <CustomButton
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={handleClear}
                    >
                      Clear
                    </CustomButton>
                  </Grid>
                  <Grid item>
                    <CustomButton
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleApply}
                    >
                      Apply
                    </CustomButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
