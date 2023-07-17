import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './Layout';
import { Homepage } from './pages/Homepage';
import { StatisticsPage } from './pages/StatisticsPage';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks/hooks';
import { setCurrentDateEmptyItem } from './store/slice/statSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);
    dispatch(setCurrentDateEmptyItem());
  }, [dispatch]);

  return (
    <>
      {mounted && (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/statistics' element={<StatisticsPage />} />
            </Routes>
          </Layout>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            closeOnClick
            pauseOnHover={false}
            draggable />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
