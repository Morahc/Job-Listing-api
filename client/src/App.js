import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import Dash from './pages/Dash';
import JobDetails from './pages/JobDetails';
import { listJobs } from './action/jobAction';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PostJob from './pages/PostJob';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/job/:id' component={JobDetails} exact/>
          <Route path='/job' component={Jobs} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/dash' component={Dash} />
          <Route path='/postjob' component={PostJob} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
