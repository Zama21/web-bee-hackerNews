import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsPage from './components/NewsPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={NewsList} />
        <Route path="/news/:id" component={NewsPage} />
      </Switch>
    </Router>
  );
};

export default App;
