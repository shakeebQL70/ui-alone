import { Chip } from "@mui/material";

export const Status = ({active = false}) => <Chip label={active ? 'Active' : 'InActive'} color={active ? 'success' : 'error'} />