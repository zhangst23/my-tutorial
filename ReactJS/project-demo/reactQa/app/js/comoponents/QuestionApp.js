
var React = require('react');
var ShowAddButton = require('./components/ShowAddButton.js');
var QuestionForm = require('./components/QuestionForm.js');
var QuestionList = require('./components/QuestionList.js');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState:function(){
    var questions = [
      {
        key: 1,
        title: '产品经理和程序员矛盾的本质是什么？',
        description: 'I don not know',
        voteCount:10,
      },
      {
        key: 2,
        title: '热爱编程是怎样一种体验？',
        description: 'I don not know',
        voteCount:8,
      },
    ];
    return {
      questions: questions,
    }
  },

  onToggleForm:function(){
    this.setState({
      formDisplayed: !this.state.formDisplayed,
    })
  },
  onNewQuestion:function(newQuestion){
    newQuestion.key = this.state.question.length + 1;

    var newQuestions = this.state.question.concat( newQuestion );

    newQuestions = this.sortQuestion( newQuestions );

    this.setState({
      questions: newQuestions
    })
  },

  sortQuestion:function(questions){
    questions.sort(function(a,b) {
      return b.voteCount - a.voteCount;
    });
    return questions;
  },
  onVote:function(key,newCount){
    var questions = _.uniq( this.state.questions );
    var index = _.findIndex( questions, function(qst){
      return qst.key == key;
    } )
    question[index].voteCount = newCount;

    questions = this.sortQuestion(questions);

    this.setState({
      questions: questions
    })
  },

  render:function(){
    return (
        <div>
          <div className="jumbotton text-center">
            <div className="container">
              <h1>React 问答</h1>
              <ShowAddButton />
            </div>
          </div>
          <div className="main container">
            <QuestionForm formDisplayed={this.state.formDisplayed}/>
            <QuestionList questions={this.state.questions } />
          </div>
        </div>
      )
  }
})
