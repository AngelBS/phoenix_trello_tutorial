import { IndexRoute, Route }        from 'react-router';
import React                        from 'react';
import MainLayout                   from '../layouts/main';
import AuthenticatedContainer       from '../containers/authenticated';
import HomeIndexView                from '../views/home';
import RegistrationsNew             from '../views/registrations/new';
import SessionsNew                  from '../views/sessions/new';
import BoardsShowView               from '../views/boards/show';
import CardsShowView               from '../views/cards/show';

export default (
  <Route component={MainLayout}>
    <Route path="/sign_up" component={RegistrationsNew} />
    <Route path="/sign_in" component={SessionsNew} />

    <Route path="/" component={AuthenticatedContainer}>
      <IndexRoute component={HomeIndexView} />

      <Route path="/boards/:id" component={BoardsShowView}>
        <Route path="cards/:id" component={CardsShowView}/>
      </Route>
    </Route>
  </Route>
);
import React, {PropTypes}   from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';

import { setDocumentTitle } from '../../utils';
import Actions              from '../../actions/sessions';

class SessionsNew extends React.Component {
  componentDidMount() {
    setDocumentTitle('Sign in');
  }

  _handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.refs;
    const { dispatch } = this.props;

    dispatch(Actions.signIn(email.value, password.value));
  }

  _renderError() {
    const { error } = this.props;

    if (!error) return false;

    return (
      <div className="error">
        {error}
      </div>
    );
  }

  render() {
    return (
      <div className='view-container sessions new'>
        <main>
          <header>
            <div className="logo" />
          </header>
          <form onSubmit={::this._handleSubmit}>
            {::this._renderError()}
            <div className="field">
              <input ref="email" type="Email" placeholder="Email" required="true" defaultValue="john@phoenix-trello.com"/>
            </div>
            <div className="field">
              <input ref="password" type="password" placeholder="Password" required="true" defaultValue="12345678"/>
            </div>
            <button type="submit">Sign in</button>
          </form>
          <Link to="/sign_up">Create new account</Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state.session
);

export default connect(mapStateToProps)(SessionsNew);