import React, { useEffect } from 'react';
import getConfig from 'next/config';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { brown, red } from '@mui/material/colors';
import { useRouter } from 'next/router'
import { css } from '@emotion/react';
import { Icon } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import Link from '@mui/material/Link';

const fetchData = async (keyword) => {
  const { API_HOST } = getConfig().publicRuntimeConfig;

  const query = new URLSearchParams();
  if (keyword) query.set('keyword', keyword);

  const host = process.browser ? '' : API_HOST;
  const res = await fetch(`${host}/api/shops?${query.toString()}`);
  return await res.json();
};

const Home = ({ firstViewShops }) => {
  const [keyword, setKeyword] = React.useState('');
  const [shops, setShops] = React.useState([]);
  const router = useRouter()

  useEffect(() => {
    setShops(firstViewShops);
  }, [firstViewShops]);

  const onSearchClick = async () => {
    const data = await fetchData(keyword);

    setShops(data);
    setKeyword('');
  };
  const styles = {
    box: css`
      margin: 0 auto;
    `,
    toppage: css`
      font-size: 60px;
      color: #fff;
      font-weight: 700;
    `,
  };

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
  
  
  
  return (
    
    <Container component="main" maxWidth="md">
     
     <Typography
      variant="h1"
      css={styles.toppage}
      sx={{
        display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#CCCCFF',
          width: 1,
          fontFamily: 'Kokoro',
          marginTop: 5,
      }}
     >
      まよいめし
    </Typography>

      <Box
        component="form"
        noValidate
        maxWidth="md"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          label="キーワードを入力してください"
          variant="standard"
          margin="normal"
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />
        <Button
          variant="contained"
          margin="normal"
          onClick={() => {
            onSearchClick();
          }}
        >
          検索
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 ,
                marginTop: 4,
    }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Button
          variant="contained"
          margin="normal"
          fullWidth
          sx={{
            bgcolor: brown,
          }}
          onClick={(e) => {
            e.preventDefault()
            router.push('/mood/gatturi');
          }}>ガッツリ系</Button>
        </Grid>
        <Grid item xs>
          <Button
          variant="contained"
          margin="normal"
          fullWidth
          sx={{
            bgcolor: "#99FF00",
          }}
          onClick={(e) => {
            e.preventDefault()
            router.push('/mood/sappari');
          }}>サッパリ系</Button>
        </Grid>
        <Grid item xs>
          <Button
          variant="contained"
          margin="normal"
          fullWidth
          sx={{
            bgcolor: "#FFCCFF",
          }}
          onClick={(e) => {
            e.preventDefault()
            router.push('/mood/deza-to');
          }}>デザート系</Button>
        </Grid>
        <Grid item xs>
          <Button
          variant="contained"
          margin="normal"
          fullWidth
          sx={{
            bgcolor: "#FFFF66",
          }}
          onClick={(e) => {
            e.preventDefault()
            router.push('/mood/keisyoku');
          }}>軽食系</Button>
        </Grid><Grid item xs>
          <Button
          variant="contained"
          margin="normal"
          fullWidth
          sx={{
            bgcolor: "#CC99FF",
          }}
          onClick={(e) => {
            e.preventDefault()
            router.push('/mood/osyare');
          }}>オシャレ系</Button>
        </Grid>
      </Grid>
    </Box>
    <Box
      component="form"
      noValidate
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <List>
        {shops.map((shop) => {
          return (
            <Link href={shop.urls.pc} underline="none">
            <ListItem key={shop.id}>
              <ListItemButton
                onClick={() => {
                  // TODO: goto shop detail
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={shop.name} src={shop.logo_image} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${shop.genre.name} ${shop.name}`}
                  secondary={
                    <>
                      <Typography variant="body1">
                       {shop.address}
                      </Typography>
                      <Typography variant="caption">{shop.budget.average}</Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Link>
            
          );
        })}
      </List>
    </Box>
  </Container>
  );
}

export const getServerSideProps = async (req) => {
  const data = await fetchData(req.query.keyword);

  return {
    props: {
      firstViewShops: data,
    },
  };
};

export default Home;