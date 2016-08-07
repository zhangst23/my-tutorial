React组件间通信学习笔记.js

父组件->子组件  :  props
子组件->父组件  :  callback
子组件->子组件  :  子组件通过回调改变父组件中的状态，通过props再修改另一个组件的状态

1、父子组件间通信

var CalendarControl = React.createClass({
	getDefaultProps: function(){
		var newDate = new Date();
		return {
			year: util.formatDate(newDate, 'yyyy'),
			month: parseInt(util.formatDate(newDate, 'MM')),
			day: parseInt(util.formatDate, 'dd')
		};
	},
	render: function(){
		return(
			<div>
				<CalendarHeader year="this.props.year" month="this.props.month" day="this.props.day"/>
			</div>
		)
	}
})

2、子父组件间通信

var CalendarControl = React.createClass({
    getInitialState: function () {
        var newDate = new Date();
        return {
            year: util.formatDate(newDate, 'yyyy'),
            month: parseInt(util.formatDate(newDate, 'MM')),
            day: parseInt(util.formatDate(newDate, 'dd'))
        };
    },
    //给子组件一个回调函数，用来更新父组件的状态，然后影响另一个组件
    handleFilterUpdate: function (filterYear, filterMonth) {
        this.setState({
            year: filterYear,
            month: filterMonth
        });
    },
    render: function () {
        return (
            <div>
                <CalendarHeader updateFilter={this.handleFilterUpdate}/>
            </div>
        )
    }
});

var CalendarHeader = React.createClass({
    getInitialState: function () {
        var newDate = new Date();
        return {
            year: util.formatDate(newDate, 'yyyy'),//设置默认年为今年
            month: parseInt(util.formatDate(newDate, 'MM'))//设置默认日为今天
        };
    },
    handleLeftClick: function () {
        var newMonth = parseInt(this.state.month) - 1;
        var year = this.state.year;
        if (newMonth < 1) {
            year--;
            newMonth = 12;
        }
        this.state.month = newMonth;
        this.state.year = year;
        this.setState(this.state);//在设置了state之后需要调用setState方法来修改状态值，
        //每次修改之后都会自动调用this.render方法，再次渲染组件
        this.props.updateFilter(year, newMonth);
    },
    handleRightClick: function () {
        var newMonth = parseInt(this.state.month) + 1;
        var year = this.state.year;
        if (newMonth > 12) {
            year++;
            newMonth = 1;
        }
        this.state.month = newMonth;
        this.state.year = year;
        this.setState(this.state);//在设置了state之后需要调用setState方法来修改状态值，
        //每次修改之后都会自动调用this.render方法，再次渲染组件，以此向父组件通信
        this.props.updateFilter(year,newMonth);
    },

    render: function () {
        return (
            <div className="headerborder">
                <p>{this.state.month}月</p>
                <p>{this.state.year}年</p>
                <p className="triangle-left" onClick={this.handleLeftClick}> </p>
                <p className="triangle-right" onClick={this.handleRightClick}> </p>
            </div>
        )
    }
});



3、兄弟组件间通信


var CalendarControl = React.createClass({
    getInitialState: function () {
        var newDate = new Date();
        return {
            year: util.formatDate(newDate, 'yyyy'),
            month: parseInt(util.formatDate(newDate, 'MM')),
            day: parseInt(util.formatDate(newDate, 'dd'))
        };
    },
    //给子组件一个回调函数，用来更新父组件的状态，然后影响另一个组件
    handleFilterUpdate: function (filterYear, filterMonth) {
        this.setState({
            year: filterYear,
            month: filterMonth
        });//刷新父组件状态
    },
    render: function () {
        return (
            <div>
                <CalendarHeader updateFilter={this.handleFilterUpdate}/>
                <CalendarBody
                    year={this.state.year}
                    month={this.state.month}
                    day={this.state.day}
                />//父组件状态被另一个子组件刷新后，这个子组件就会被刷新
            </div>
        )
    }
});















