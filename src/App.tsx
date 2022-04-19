import {
  Container,
  createTheme,
  Grid,
  Button,
  Paper,
  ThemeProvider,
  useTheme,
  Box,
  Stack,
  ButtonGroup,
} from '@mui/material';
import {createContext, useContext, useMemo, useState} from 'react';

const ColorModeContext = createContext({toggleColorMode: () => {}});

export const ThemedApp = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        width: '100vw',
        p: 2,
      }}
    >
      <Stack direction="row" justifyContent="end" alignItems="center" mb={2}>
        <ButtonGroup variant="text" aria-label="text button group" color="secondary">
          <Button disabled={theme.palette.mode === 'dark'} onClick={colorMode.toggleColorMode}>
            Dark
          </Button>
          <Button disabled={theme.palette.mode === 'light'} onClick={colorMode.toggleColorMode}>
            Light
          </Button>
        </ButtonGroup>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={1}>
            <Box
              sx={{
                p: 2,
              }}
            >
              Prompt
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={1}>
            <Box
              sx={{
                p: 2,
              }}
            >
              Result
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ThemedApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
