import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
  const cardList = state[namespace].data;
  return {
    cardList,
  };
};

const mapDispatchToProps = dispatch => ({
  onClickAdd: newCard => dispatch({ type: `${namespace}/addNewCard`, payload: newCard })
});

const PuzzleCardsPage = ({ cardList, onClickAdd }) => (
  <div>
    {
      cardList.map(card => {
        return (
          <Card key={ card.id }>
            <div>Q: { card.setup }</div>
            <div>
              <strong>A: { card.punchline }</strong>
            </div>
          </Card>
        );
      })
    }
    <div>
    <Button onClick={ () => onClickAdd({
      setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      punchline: 'here we use dva',
    }) }> 添加卡片 </Button>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleCardsPage);
