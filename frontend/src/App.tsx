import './App.css'
import DrawerAppBar from './Containers/AppToolbar/AppToolbar';
import {Routes, Route} from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';
import { Typography } from '@mui/material';
import NewsList from './Components/NewsList/NewsList';
import NewsDetails from './Components/NewsList/NewsDetails';
import AddNewPost from './Components/AddNewPost/AddNewPost';

const App = () => {

  return (
    <>
      <DrawerAppBar/>
      <Routes>
        <Route path="/" element={(
          <NewsList/>
        )}/>
        <Route path="/:id" element={(
          <NewsDetails/>
        )}/>
        <Route path="/add" element={(
          <AddNewPost/>
        )}/>
        <Route path="*" element={(
          <Typography sx={{textAlign: "center"}} variant="h4" component="h1" gutterBottom>
            <BlockIcon/>
            Not Found
          </Typography>
        )}/>
      </Routes>

    </>
  )
}

export default App
