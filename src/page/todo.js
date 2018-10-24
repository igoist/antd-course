import React, { Component } from 'react';
import { Card, Button, Icon, Row, Col, Tag } from 'antd';
import { connect } from 'dva';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const namespace = 'todos';

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
};

const mapStateToProps = (state) => ({
  todos: state[namespace].data,
  filter: state[namespace].filter,
});

const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch({ type: `${namespace}/queryInitTodo` }),
  onClickAdd: newTodo => dispatch({ type: `${namespace}/addNewTodo`, payload: newTodo }),
  onClickDelete: id => dispatch({ type: `${namespace}/deleteTodo`, id }),
  toggleTodo: id => dispatch({ type: `${namespace}/toggleTodo`, id }),
  setFilter: filter => dispatch({ type: `${namespace}/setFilter`, filter }),
});

class Todo extends React.Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const { todos, onClickAdd, onClickDelete, toggleTodo, filter, setFilter } = this.props;
    const items = getVisibleTodos(todos, filter);

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Tabs defaultActiveKey='1' onChange={ activeKey => {
          switch (activeKey) {
            case '1':
              setFilter('SHOW_ALL');
              break;
            case '2':
              setFilter('SHOW_ACTIVE');
              break;
            case '3':
              setFilter('SHOW_COMPLETED');
              break;
          }
        } }>
          <TabPane tab='All' key='1'></TabPane>
          <TabPane tab='Active' key='2'></TabPane>
          <TabPane tab='Completed' key='3'></TabPane>
        </Tabs>
        <Row gutter={16}>
          {
            items.map(todo => {
              return (
                <Col key={ todo.id } span={8}>
                  <Card
                    key={ todo.id }
                    title={
                      <div>
                        <Tag color='#2db7f5'>life</Tag>
                        <Tag color='#f50'>tmp</Tag>
                      </div>
                    }
                    bordered={true}
                    hoverable={true}
                    extra={
                      <Button
                        icon='close'
                        style={{ color: '#f81d22' }}
                        onClick={ () => onClickDelete(todo.id) }
                      />
                    }
                    style={{ backgroundColor: '#fbe08c', color: '#464645' }}
                    actions={[
                      <Icon
                        type='check'
                        style={{ color: todo.completed ? 'green' : '' }}
                        onClick={ () => toggleTodo(todo.id) }
                      />,
                      <Icon type='edit' />,
                      <Icon type='ellipsis' />]}
                  >
                    <div>{ todo.text }</div>
                  </Card>
                </Col>
              );
            })
          }
        </Row>
        <div>
        <Button onClick={ () => onClickAdd({
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        }) }> 添加卡片 </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
