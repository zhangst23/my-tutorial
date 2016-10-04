import React from 'react'

export class Container extends React.Component {
	onReady(mapProps, map){

	}

	render(){
		return (
			<Map
				visible={false}
				className={styles.warpper}>
				<Header />
				<Sidebar />
			</Map>
		)
	}
}

export default Container