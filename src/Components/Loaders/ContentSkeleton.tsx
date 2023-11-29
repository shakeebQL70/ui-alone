import React from 'react'
import { Box, Paper, Skeleton, Stack } from '@mui/material'
import { StyledTableCell, StyledTableRow } from '../Tables'

export const HeaderSkeleton = () => <Paper sx={{display:'flex', justifyContent:'space-between', alignItems:'center', p: 2}} >
  <Skeleton variant="rounded" width={200} />
  <Box display='flex' gap={2} alignItems='center' >
      <Skeleton variant="rounded" width={100} height={20} />
      <Skeleton variant="rounded" width={100} height={20}/>
      <Skeleton variant="rounded" width={100} height={20}/>
  </Box>
</Paper>

export const FilterSkeleton = () => <Paper sx={{display:'flex', justifyContent:'space-between', alignItems:'center', p: 2, my: 5}} >
  <Box display='flex' gap={2} alignItems='center' >
      <Skeleton variant="rounded" width={200} />
      <Skeleton variant="rounded" width={200} />
      <Skeleton variant="rounded" width={200} />
  </Box>

  <Box display='flex' gap={2} alignItems='center' >
      <Skeleton variant="rounded" width={100} height={20} />
      <Skeleton variant="rounded" width={100} height={20}/>
      <Skeleton variant="rounded" width={100} height={20}/>
  </Box>
</Paper>

export const ExportSkeleton = () => <Box display='flex' justifyContent='flex-end'>
  <Skeleton variant="text" width={100} height={20} />
</Box>

export const TableRowsSkeleton = ( {items}: {items: number}) => {
  return Array.from(Array(3)).map((pI) => <StyledTableRow key={pI}>
    {
      Array.from(Array(items)).map((cI) => <StyledTableCell key={cI}> <Skeleton /> </StyledTableCell>)
    }
  </StyledTableRow>)
}

const ContentSkeleton = () => {

  return (
    <Stack spacing={1}>
        <HeaderSkeleton />
        <FilterSkeleton />
        <ExportSkeleton />

        <Skeleton variant="rounded" height={200} />
    </Stack>
  )
}

export default ContentSkeleton