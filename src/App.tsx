import {
  createTheme,
  Grid,
  Button,
  Paper,
  ThemeProvider,
  useTheme,
  Stack,
  ButtonGroup,
  Typography,
  Chip,
  Input,
} from '@mui/material';
import {createContext, useContext, useMemo, useState} from 'react';

const ColorModeContext = createContext({toggleColorMode: () => {}});

interface FetchOptions {
  url: string;
  count?: number;
}

export const ThemedApp = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [resultPreview, setResultPreview] = useState<string>('');
  const [formData, setFormData] = useState<{count: number; firstName?: string}>({count: 10});

  const requestAPI = async (options: FetchOptions) => {
    const response = await fetch(
      `http://localhost:4000${options.url}?count=${formData.count}&prefix=${formData.firstName}`
    );

    if (response.ok) {
      const res = await response.json();
      setResultPreview(res.data);
    } else {
      console.error('HTTP-Error: ' + response.status);
      setResultPreview('Oops.. something wnt wrong');
    }
  };

  return (
    <Stack
      direction="column"
      height="100%"
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        width: '100vw',
        p: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="column">
          <Typography variant="h3" color="textPrimary">
            Test API app
          </Typography>
          <Typography variant="h5" color="textPrimary">
            FE Vite & React | BE Node & Express
          </Typography>
        </Stack>
        <ButtonGroup variant="text" aria-label="text button group" color="secondary">
          <Button disabled={theme.palette.mode === 'dark'} onClick={colorMode.toggleColorMode}>
            Dark
          </Button>
          <Button disabled={theme.palette.mode === 'light'} onClick={colorMode.toggleColorMode}>
            Light
          </Button>
        </ButtonGroup>
      </Stack>
      <Grid container spacing={2} flex="1 1 auto">
        <Grid item xs={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 2,
            }}
          >
            <Stack spacing={2} alignItems="start" direction="column">
              <Typography variant="overline">Params</Typography>
              <Stack direction="row" spacing={1} alignItems="center" width="100%" justifyContent="space-between">
                <Typography variant="body2">Count</Typography>
                <input
                  name="count"
                  type="number"
                  min={1}
                  max={1000}
                  value={formData.count}
                  onChange={(e) => setFormData({...formData, count: parseInt(e.target.value) ?? 1})}
                />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" width="100%" justifyContent="space-between">
                <Typography variant="body2">First name</Typography>
                <Input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </Stack>
            </Stack>
          </Paper>
          <Paper
            elevation={2}
            sx={{
              p: 3,
            }}
          >
            <Stack spacing={2} alignItems="start" direction="column">
              <Typography variant="overline">Prompt</Typography>
              <Chip label="Test server" onClick={() => requestAPI({url: '/'})} />
              <Chip label="Get random names" onClick={() => requestAPI({url: '/names'})} />
              <Chip label="Get matching names" onClick={() => requestAPI({url: '/namesStartWith'})} />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
            }}
          >
            <Stack spacing={2}>
              <Typography variant="overline">Result</Typography>
              <code>{resultPreview}</code>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
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
        typography: {
          fontFamily: ['-apple-system', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
          /* fontSize: 12, */
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
