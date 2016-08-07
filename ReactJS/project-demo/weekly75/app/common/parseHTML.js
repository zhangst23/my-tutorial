'use strict';

var React = require('react-native');

var {
	View,
	Text,
	Image,
	StyleSheet
} = React;

var ParseHTML = React.createClass({
	getInitialState: function() {
		var defaultTagToStyle = {
			'<b>': {fontWeight: 'bold'},
			'<strong>': {fontWeight: 'bold'},
			'<i>': {fontStyle: 'italic'},
			'<normal>': {fontStyle: 'normal'},
			'<em>': {fontStyle: 'italic'},
			'<img>': {},
		};

		if (this.props.customTagStyle) {
			for(var i in Object.keys(this.props.customTagToStyle)){
				defaultTagToStyle[Object.keys(this.props.customTagToStyle)[i]] = this.props.customTagtoStyle[Object.keys(this.props.customTagToStyle)[i]];				
			}
		}
		return {
			tagToStyle: defaultTagToStyle,
		};
	},

	_getNextHTMLTag: function(html_code, tags_to_look_for){
		var min = -1;
		var nextTag = "";

		for (var i = 0; i < tags_to_look_for.length; i++) {
			var tag = tags_to_look_for[i];
			var nextIndex = html_code.indexOf(tag);
			if (min == -1) {
				min = nextIndex;
				nextTag = tag;
			}else{
				if (min>nextIndex && nextIndex != -1) {
					min = nextIndex;
					nextTag = tag;
				}
			}
		}
		return {"tag": nextTag, "indexStart": min};
	},

	_buildHTMLParseTree: function(html_code){
		return this._buildHTMLParseTreeOverload(html_code, []);
	},

	_buildHTMLParseTreeOverload: function(html_code, segments, style){
		if (segments==undefined) {
			segments = [];
		}
	}
})










