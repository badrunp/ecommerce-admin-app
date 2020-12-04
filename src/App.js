import './App.css';
import Routes from './configs/routes';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, userIsLogin } from './actions';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'



function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    if(!auth.authenticate){
      dispatch(userIsLogin())
    }

    dispatch(getAllCategory())
  }, [])

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
