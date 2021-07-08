import Nav from '../components/Nav';
import ScreenLoader from '../components/ScreenLoader';
import Hero from './Hero';
import About from './About';
import Categories from './Categories';
import Jobs from './RecentJobs';
import Contact from './Contact';
import Footer from './Footer';
import { useSelector } from 'react-redux';


const Home = ({ history }) => {
  const { loading } = useSelector((state) => state.jobList);
  return (
    <div id='hero' style={{ backgroundImage: "url('/img/email-pattern.png')" }}>
      {loading && <ScreenLoader/>}
      <Nav history={history}/>
      <Hero />
      <About />
      <Categories history={history}/>
      <Jobs/>
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
