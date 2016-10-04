// React JS Tutorial and Guide to the Gotchas教程.js

//1.0 
var names = ['Moe', 'Larry', 'Curly'];

React.render(
	<div>
		{
			names.map(function(name){
				return <div>Hello, {name}!</div>
			})
		}
	</div>,
	document.body
);



// 2.0
var notepad = {
	notes: [
 		{
            id: 1,
            content: "Hello, world!\nBoring.\nBoring.\nBoring."
        },
        {
            id: 2,
            content: "React is awesome.\nSeriously, it's the greatest."
        },
        {
            id: 3,
            content: "Robots are pretty cool.\nRobots are awesome, until they take over."
        },
        {
            id: 4,
            content: "Monkeys.\nWho doesn't love monkeys?"
        }
	]
};

var NotesList = React.createClass({
	render: function(){
		var notes = this.props.notepad.notes;

		return (
			<div className="note-list">
				{
					notes.map(function(note){
						var title = note.content.substring(0,
							note.content.indexOf('\n')
						);
						title = title || note.content;

						return (
							<div key={note.id} className="note-summary">{title}</div>
						);
					})
				}
			</div>
		);
	}
});


// 3.0

var notepad = {
	notes: [
 		{
            id: 1,
            content: "Hello, world!\nBoring.\nBoring.\nBoring."
        },
        {
            id: 2,
            content: "React is awesome.\nSeriously, it's the greatest."
        },
        {
            id: 3,
            content: "Robots are pretty cool.\nRobots are awesome, until they take over."
        },
        {
            id: 4,
            content: "Monkeys.\nWho doesn't love monkeys?"
        }
	]
};



var NoteSummary = React.createClass({
	render: function(){
		var note = this.props.note;
		var title = note.content.substring(0,
			note.content.indexOf('\n')
		);
		title = title || note.content;

		return (
			<div className="note-summary">{title}</div> /
		);
	}
});

var NotesList = React.createClass({
	render: function(){
		var notes = this.props.notepad.notes;

		return (
			<div className="note-list">
				{
					notes.map(function(note){
						return (
							<NoteSummary key={note.id} note={note}/>
						)
					})
				}
			</div>
		);
	}
});

React.render(
	<NotesList notepad={notepad}/>, /
	document.body
);


// 4.0 

var notepad = {
	notes: [],
	selectedId: null
};

var nextNodeId = 1;

var onAddNote = function(){
	var note = {id: nextNodeId, content: ''};
	nextNodeId++;
	notepad.notes.push(note);
	notepad.selectedId = note.id;
	onChange();
};

var onChangeNote = function(id, value){
	var note = _.find(notepad.notes, function(notepad.note, function (note){

	});
	if (note) {
		note.content = value;
	}
	onChange();
};

var NoteSummary = React.createClass({
	render: function(){
		var note = this.props.note;
		var title = note.content;
		if (title.indexOf('\n')>0) {
			title = note.content.substring(0, note.content.indexOf('\n'));
		}
		if (!title) {
			title = 'Untitled';
		}
		return (
			<div className="note-summary">{title}</div>
		);
	}
});

var NotesList = React.createClass({
	render: functionf(){
		var notes = this.props.notepad.notes;

		return (
			<div class="note-list">
				{
					notes.map(function(note){
						return (
							<NoteSummary key={note.id} note={note}/>
						);
					})
				}
			</div>
		);
	}
});

var NoteEditor = React.createClass({
	onChange:function(event){
		this.props.onChange(this.props.note.id, event.target.value);
	},
	render: function(){
		return (
			<textarea rows={5} cols={40} value={this.props.note.content} onChange={this.onChange}/>
		);
	}
});

var Notepad = React.createClass({
	render: function(){
		var notepad = this.props.notepad;

		var editor = null;

		var selectedNote = _.find(notepad.notes, function(note){
			return note.id === notepad.selectedId;
		});

		if (selectedNote) {
			editor = <NoteEditor note={selectedNote} onChange={this.props.onChangeNote}/>
		}

		return (
			<div id="notepad">
				<NotesList notepad={notepad}/>
				<div><button onClick={this.props.onAddNote}>Add note</button></div>
				{editor}
			</div>
		);
	}
});

var onChange = function(){
	React.render(
		<Notepad notepad={notepad} onAddNote={onAddNote} onChangeNote={onChangeNote}/>,
		document.body
	);
};

onChange();

































