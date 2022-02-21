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
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router'
import { css } from '@emotion/react';
import SvgIcon from '@mui/material/SvgIcon';
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

  
  
  return (
    
    <Container component="main" maxWidth="md">
     
     <Typography
      variant="h1"
      css={styles.toppage}
      sx={{
        display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'yellow',
          width: 1,
          fontFamily: 'Caveat',
      }}
     >
      今日のお食事気分
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
          fullWidth
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />
        <Button
          variant="contained"
          margin="normal"
          fullWidth
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
          onClick={(e) => {
            e.preventDefault()
            router.push('/mood/keisyoku');
          }}>軽食系</Button>
        </Grid><Grid item xs>
          <Button
          variant="contained"
          margin="normal"
          fullWidth
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