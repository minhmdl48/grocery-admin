import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({title}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return <Box >
        <Typography 
        variant="h2" 
        color={colors.blackAccent[300]}
        fontWeight="bold"
        sx={{mb : "5px"}}>
            {title}
            </Typography>
    </Box>
}

export default Header;