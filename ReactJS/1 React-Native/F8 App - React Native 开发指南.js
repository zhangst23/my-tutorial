F8 App - React Native 开发指南.js

// 控件的示例代码
// from js/common/F8SegmentedControl.js
class Segment extends React.Component {
	props: {
		value: string;
		isSelected: boolean;
		selectionColor: string;
		onPress: () => void;
	};

	render() {
		var selectedButtonStyle;
		if (this.props.isSelected) {
			selectedButtonStyle = { borderColor: this.props.selectionColor };
		}
		var deselectedLabelStyle;
		if (!this.props.isSelected && Platform.OS === 'android') {
			deselectedLabelStyle = styles.deselectedLabel;
		}
		var title = this.props.value && this.props.value.toUpperCase();

		var accessibilityTraits = ['button'];
		if (this.props.isSelected) {
			accessibilityTraits.push('selected');
		}

		return (
			<TouchableOpacity
				accessibilityTraits={accessibilityTraits}
				activeOpactiy={0.8}
				onPress={this.props.onPress}
				style={[styles.button, selectedButtonStyle]}>
				<Text style={[styles.label, deselectedLabelStyle]}>
					{title}
				</Text>
			</TouchableOpacity>
		);
	}
}

// 在这里，我们使用 React Native 的 Platform module，根据代码在不同的平台上运行，应用不同的样式。
// 在这两个平台上，tab 按钮先使用同样的样式，然后分化
var styles = F8StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'transparent',
		ios: {
			paddingBottom: 6,
			justifyContent: 'center',
			alignItems: 'center',
		},
		android: {
			paddingLeft: 60,
		},
	},
	button: {
		borderColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		ios: {
			height: HEIGHT,
			paddingHorizontal: 20,
			borderRadius: HEIGHT / 2,
			borderWidth: 1,
		},
		android: {
			paddingBottom: 6,
			paddingHorizontal: 10,
			borderBottomWidth: 3,
			marginRight: 10,
		},
	},
	label: {
		letterSpacing: 1,
		fontSize: 12,
		color: 'white',
	},
	deselectedLabel: {
		color: 'rgba(255, 255, 255, 0.7)',
	},
});


// 这里，我们使用一个改造后的 React Native StyleSheet API，可根据平台进行一下选择转换：
export function create(styles: Object): {[name: string]: number}{
	const platformStyles = {};
	Object.keys(styles).forEach((name) => {
		let {ios, android, ...style} = {...styles[name]};
		if (ios && Platform.OS === 'ios') {
			style = {...style, ...ios};
		}
		if (android && Platfrom.OS === 'android') {
			style = {...style, ...android};
		}
		platformStyles[name] = style;
	});
	return StyleSheet.create(platformStyles);
}

// 分离复杂的差异
// 在这 F8StyleSheet 函数中，我们解析一个给定的样式对象。如果我们遇有 ios 或者 android 这样的 key 并和当前运行的平台一致，我们就使用 key 对应的样式，否则忽略。这个例子也向我们说明了，React Native 中尽量复用代码以减少重复代码的思想。
// 现在，我们可以在 app 中复用这个组件了，并且，UI 样式是对 iOS 和 Android 适配的。

//  iOS 版本使用固定的底部导航，而 Android 则使用侧滑菜单。
// 正确的做法，我们应该使用 React Native 内置的 特定平台下的扩展。这个特性允许我们创建两个不同的组件，其中一个叫 FBTabsView.ios.js，另外一个叫 FBTabsView.android.js。React Native 会根据运行的平台自动找到并加载他们。


//内置的UI组件
render(){
	return (
		<DrawerLayoutAndroid
			ref="drawer"
			drawerWidth={300}
			drawerPosition={DrawerLayoutAndroid.positions.Left}
			renderNavigationView={this.renderNavigationView}>
			<View style={styles.content} key={this.props.activeTab}>
				{this.renderContent()}
			</View>
		</DrawerLayoutAndroid>
	)
}



//设计迭代周期
// 可控的调试控件 Playground

//from js/setup.js
class Playground extends React.Component {
	constructor(props){
		super(props);
		const content = [];
		const define = (name: string, render: Function) => {
			content.push(<Example key={name} render={render} />); /
		};

		var AddToScheduleButton = require('./tabs/schedule/AddToScheduleButton'); 
		AddToScheduleButton.__cards__(define);
		this.state = {content};
	}

	render(){
		return (
			<View style=> {this.state.content}></View> /
		)
	}
}


// 这个控件简单地创建了一个空的 view，这个 view 可以被真正的控件置换。比如当我们在一个 UI 组件中，把这个和一些
// 定义绑定，以 AddToScheduleButton 为例说明：
// from js/tabs/schedule/AddToScheduleButton.js
module.exports.__cards__ = (define) => {
	let f;
	setInterval(() => f && f(), 1000);

	define('Inactive', (state = true, update) =>
		<AddToScheduleButton isAdded={state} onPress={() => update(!state)} />);  /

	define('Active', (state = false, update) =>
		<AddToScheduleButton isAdded={state} onPress={() => update(!state)} />); /

	define('Animated', (state = false, update) => {
		f = () => update(!state);
		return <AddToScheduleButton isAdded={state} />; /
	});
};


// <Playground> 可以在任何 React Native app 中复用，如果你想使用它，只需要在 setup() 函数中加载 <Playground> 即可：
// from js/setup.js
render(){
	...
	return (
		<Provider store={this.state.store}>
			<F8App />
		</Provider> /
	);
}

// 变为
render(){
	...
	return(
		<Provider store={this.state.store}>
			<Playground />
		</Provider>
	)
}



















