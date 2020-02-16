import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../history';
import '../../semantic/dist/semantic.min.css';

import Navbar from '../../components/Navbar/Navbar';
import Index from '../../pages/index';
import HomesList from '../../pages/HomesList';
import HomesShow from '../../pages/HomesShow';

const App = () => {
	return (
		<>
		<Router history={history}>
			<div>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Index} />
					<Route path='/homes' exact component={HomesList} />
					<Route path='/homes/details/:id' exact component={HomesShow} />
				</Switch>
			</div>
		</Router>
		</>
	);
};

export default App;