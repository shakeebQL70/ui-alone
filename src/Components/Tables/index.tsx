import React, {useState} from "react";
import { Box, Chip, TableFooter, Typography } from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody, { TableBodyProps } from "@mui/material/TableBody";
import TableCell, { TableCellProps, tableCellClasses } from "@mui/material/TableCell";
import TableContainer, {
  TableContainerProps,
} from "@mui/material/TableContainer";
import TableHead, { TableHeadProps } from "@mui/material/TableHead";
import TablePagination, {
  TablePaginationProps,
} from "@mui/material/TablePagination";
import TableRow, { TableRowProps } from "@mui/material/TableRow";
import PaginationActions from "./components/PaginationActions";
import { CheckCircleOutlineRounded, CancelRounded } from "@mui/icons-material";

export type TTableContainer = TableContainerProps & {
  children: React.ReactNode;
};
export type TTableHeader = TableHeadProps & { children: React.ReactNode };
export type TTableBody = TableBodyProps & { children: React.ReactNode };
export type TTableRow = TableRowProps & { children: React.ReactNode };
export type TTableCell = TableCellProps & { children: React.ReactNode };
export type TTablePagination = TablePaginationProps & { rows: any[] };
export type TPaper = PaperProps & { children: React.ReactNode };

export const Status = ({active = false}) => <Box display='flex' gap='5px' alignItems='center' >
    <Chip sx={{height:'10px', width: '10px'}} color={active ? 'success' : 'error'} />
    <Typography> {active ? 'Active' : 'Inactive'} </Typography>
  </Box>

export const Trained = ({trained = false}) => <Box textAlign='center'>

    {trained ? 
      <CheckCircleOutlineRounded sx={{color: 'green'}} />
      : <CancelRounded sx={{color:'crimson'}} />}
  </Box>

export const PaperWrapper = ({ children, ...props }: TPaper) => (
  <Paper {...props}>{children}</Paper>
);

export const TableWrapper = ({ children, ...props }: TTableContainer) => (
  <TableContainer sx={{ ...props }} component={PaperWrapper}>
    <Table stickyHeader aria-label="sticky table">
      {children}
    </Table>
  </TableContainer>
);

export const TableHeadWrapper = ({ children, ...props }: TTableHeader) => (
  <TableHead {...props}>
    <TableRow>{children}</TableRow>
  </TableHead>
);

export const TableBodyWrapper = ({ children, ...props }: TTableBody) => (
  <TableBody {...props}>{children}</TableBody>
);

export const TableRowWrapper = ({ children, ...props }: TTableRow) => (
  <TableRow {...props}>{children}</TableRow>
);

export const TableCellWrapper = ({ children, ...props }: TTableCell) => (
  <TableCell {...props}>{children}</TableCell>
);

export const StyledTableCell = styled(TableCellWrapper)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRowWrapper)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const PaginationWrapper = ({
  rows,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  count,
  ...props
}: TTablePagination) => {
  const theme = useTheme();

  return (
    <TablePagination
      rowsPerPageOptions={rows}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      color={theme.palette.primary.main}
      {...props}
    />
  );
};

export const RowMultipleData = ({data, highlightedKeys}: {data: {key: string, value: string | number}[], highlightedKeys: string[]}) => <Box>
    {
      data?.map((item, index) => <Typography key={index} sx={{color:'#333', fontWeight:'bold'}}> 
        <Typography component='span' sx={{color: highlightedKeys.includes(item.key) ? 'crimson' : 'inherit', fontWeight:'bold'}}> {item.key} </Typography>: {item.value}
      </Typography>)
    }
  </Box>

export interface ICustomTable {
  rows: {[key: string]: string | number}[]; cols: string[]; currentPage?: number; rowPerPage?: number; pagesOptions?: number[]
}


export const CustomTable = ({rows, cols, currentPage, rowPerPage, pagesOptions} : ICustomTable) => {
  const options = pagesOptions || [5, 10, 15]

  const [page, setPage] = useState(currentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(rowPerPage || options[0]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowToMap = rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows

  return (
    <TableWrapper>
      <TableHeadWrapper>
        {
          cols.map((col, index) => <StyledTableCell key={index} component="th" scope="row">
              {col}
          </StyledTableCell>)
        }
      </TableHeadWrapper>
      <TableBodyWrapper>
        {rowToMap.map((row) => {
          const cells = [];
          for(let key in row){
            cells.push(
              <StyledTableCell component="th" scope="row">
                {row[key]}
              </StyledTableCell>
            )
          }
          return <StyledTableRow key={row.name}>
            {cells}
          </StyledTableRow>
        })}
      </TableBodyWrapper>
      <TableFooter>
        <TableRowWrapper>
          <PaginationWrapper
            rows={[...options, { label: 'All', value: -1 }]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={PaginationActions}
          />
        </TableRowWrapper>
      </TableFooter>
    </TableWrapper>
  )
}

export default CustomTable
