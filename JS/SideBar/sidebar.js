(function(){

	var Menubar = function(){
		this.el = document.querySelector('#sidebar ul');
		this.state = 'allClosed';
		this.addEventListener('click',function(e){
			e.stopPropagation();

		});
		var self = this;
		this.currentOpendMenuContent = null;
		this.menuList = document.querySelectorAll('#sidebar ul > li');
		for (var i = 0;i<this.menuList.length; i++) {
			this.menuList[i].addEventListener('click',function(e){
				var menuContentE1 = document.getElementById(e.currentTarget.id + '-content');
				if (slef.state === 'allClosed') {
					console.log('打开' + menuContentE1.id);
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentE1;
				}else{
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentE1;
				};


			};)
		}

	var Sidebar = function(eId,closeBarId){
		this.state = 'opened';
		this.el = document.getElementById(eId||'sidebar');
		this.closeBarE1 = document.getElementById(closeBarId || 'closeBar');
		var self = this;
		this.Menubar = new Menubar();
		this.el.addEventListener('click',function(event){
			if (event.target !==self.el) {
				self.triggerSwitch();
			};
		},)
	};
	Sidebar.prototype.close = function(){
		
	};
	Sidebar.prototype.open = function(){};
	Sidebar.prototype.triggerSwitch = function(){
		if (this.state === 'opened') {
			this.close();
		}else{
			this.open();
		};
	}
	var sidebar = new Sidebar();

	


























})();








