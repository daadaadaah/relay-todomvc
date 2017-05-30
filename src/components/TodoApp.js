import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';

import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

const propTypes = {
  viewer: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  relay: PropTypes.object.isRequired,
};

class TodoApp extends React.Component {
  onNewTodoSave = (text) => {
    const { relay, viewer } = this.props;

    relay.commitUpdate(
      new AddTodoMutation({ viewer, text }),
    );
  };

  render() {
    const { viewer, children } = this.props;

    return (
      <div data-framework="relay">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodoTextInput
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onSave={this.onNewTodoSave}
            />
          </header>

          {children}

          <TodoListFooter viewer={viewer} />
        </section>

        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Adapted by <a href="http://fashionablenonsense.com/">
              @jimmy_jia
            </a> from work by the <a href="https://facebook.github.io/relay/">
              Relay team
            </a>
          </p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    );
  }
}

TodoApp.propTypes = propTypes;

export default Relay.createContainer(TodoApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${TodoListFooter.getFragment('viewer')}
        ${AddTodoMutation.getFragment('viewer')}
      }
    `,
  },
});
