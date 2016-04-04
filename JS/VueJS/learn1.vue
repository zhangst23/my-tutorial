#app
  tasks(:list='tasks')

template#tasks-template
  h1 My tasks 
    span(v-show='remaining') ({{ remaining }})
  
  ul(v-show='list.length')
    li(v-for='task in list', :class='{ completed: task.completed }', @click='task.completed = ! task.completed')
      | {{ task.body }} 
      strong(@click='deleteTask(task)') x
  
  p(v-else) No tasks yet!
  
  button(@click='clearCompleted') Clear Completed





<script>
	Vue.component('tasks', {
		props: ['list'],
		template: '#tasks-template',
		computed: {
			remaining: function(){
				var vm = this;
				return
				this.list.filter(this.isInProgress).length
			}
		},
		methods: {
			isCompleted: function(task){
				return task.completed;
			},
			isInProgress: function(task){
				return !
				this.isCompleted(task);
			},
			deleteTask: function(task){
				this.list.$remove(task);
			},
			clearCompleted: function(){
				this.list = this.list.filter(this.isInProgress)
			}
		}
	});

	new Vue({
		el: '#app',
		data: {
			tasks: [
				{ body: 'Go to the store', completed: false },
				{ body: 'Go to the bank', completed: false },
				{ body: 'Go to the doctor', completed: true }
			]
		}
	});


</script>




























