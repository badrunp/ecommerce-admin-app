import './App.css';
import Routes from './configs/routes';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getAllProduct, initialData, outputChat, userIsLogin } from './actions';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import io from 'socket.io-client'
import { checkDarkMode } from './actions/darkmode.action';


function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(userIsLogin())
    }

    if(auth.authenticate){
      dispatch(getAllProduct())
    }

    if(auth.authenticate){
      dispatch(getAllCategory())
    }


  }, [auth])

  useEffect(() => {
    dispatch(checkDarkMode())
  }, [checkDarkMode])


  return (
    <>
      <Routes />
    </>
  );
}

export default App;
