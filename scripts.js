// $( document ).ready(function(){

// function ready() {
	window.onload = function() {

	window.vm = new Vue({
		el: '#app',
		data: {
			msg: 'Hello World',
			interface: {
			},
			interface_lng: {
				rus: {
					logo: 'ToDo SPA',
					language: 'Язык',
					app_lists: [
						'ToDo SPA',
						'Скоро...',
						'Скоро...',
						'Скоро...',
					],
					new_task_header: 'Создать новое задание',
					new_task_title: 'Заголовок',
					new_task_error: 'Это поле обязательно для заполнения',
					new_task_description: 'Описание',
					new_task_btn_clr: 'Очистить',
					new_task_btn_add: 'Добавить',
					card_btn_1: 'Редактировать',
					card_btn_1_1: 'Сохранить',
					card_btn_2: 'Удалить',
					card_done_no: 'Выполнено: Нет',
					card_done_yes: 'Да',
					float_btn: {
						main_btn: 'Действия со списком',
						view_non_complete: 'Только не выполненные',
						view_complete: 'Только выполненные',
						view_all: 'Показать все',
						complete_all: 'Выполнить все',
						delete_all: 'Удалить все'
					},
				},
				eng: {
					logo: 'ToDo SPA',
					language: 'Language',
					app_lists: [
						'ToDo SPA',
						'Coming soon...',
						'Coming soon...',
						'Coming soon...',
					],
					new_task_header: 'Create new task',
					new_task_title: 'Title',
					new_task_error: 'This field is required',
					new_task_description: 'Description',
					new_task_btn_clr: 'Clear',
					new_task_btn_add: 'Create',
					card_btn_1: 'Edit',
					card_btn_1_1: 'Save',
					card_btn_2: 'Delete',
					card_done_no: 'Complete: No',
					card_done_yes: 'Yes',
					float_btn: {
						main_btn: 'List action',
						view_non_complete: 'View non complete',
						view_complete: 'View complete',
						view_all: 'View all',
						complete_all: 'Complete all',
						delete_all: 'Delete all'
					},
				},
			},
			tasks: [
				// {
				// 	id: 0,
				// 	title: 'сделать очень важную вещь',
				// 	descr: 'Некий текст, который должен характеризовать заголовок',
				// 	done: false,
				// 	active: false
				// },

				// {
				// 	id: 0,
				// 	title: '1',
				// 	descr: 'Некий текст, который должен характеризовать заголовок',
				// 	done: false,
				// 	active: false
				// },
				// {
				// 	id: 1,
				// 	title: '2',
				// 	descr: 'Некий текст, который должен характеризовать заголовок',
				// 	done: true,
				// 	active: false
				// },
			],
			new_title: '',
			new_descr: '',
			new_id: 1,
			emptyTitle_check: false,
			edit_title: false,
			edit_descr: false,
			editIndex: -1,
			task_view_mode: 0,
			allDone: false,
			default_lang: 'rus',
		},
		created: function() {
			eval('this.interface = this.interface_lng.'+this.default_lang)
			// this.tasks = JSON.parse(localStorage.getItem('tasks'))
			var restore_tasks = JSON.parse(localStorage.getItem('tasks'))
			// console.log(restore_tasks)
			restore_tasks ? this.tasks = restore_tasks : this.tasks = []
			this.tasks = restore_tasks
		},
		methods: {
			defaultState: function() {
				this.editIndex = -1
				// $('.collapsible_').collapsible('close', 0);
			},
			changeLng : function(lng) {
				console.log(lng)
				setTimeout(function() {
					$('.tooltipped').tooltip()
				}, 0)
				eval('this.interface = this.interface_lng.'+lng)
				// this.interface = this.interface_lng.lng	
			},
			addTask: function(el) {
				// console.log('addTask')
				if(this.new_title.length > 0) {
					var new_task = {
						id: this.new_id,
						title: this.new_title,
						descr: this.new_descr,
						done: false,
						active: false
					}
					this.tasks.push(new_task)
					this.new_id++
					this.clearForm(el)
					this.saveToLocal()
				} else {
					this.focus(el)
					this.emptyTitle_check = true
				}
			},
			removeTask: function(index) {
				this.tasks.splice(index, 1)
				this.editIndex = -1
				this.saveToLocal()
			},
			editTask: function(index, event) {
				console.log('В editTask передан индекс '+index)
				console.log('Эвент редактирования:')
				
				this.editIndex = index
				this.tasks[index].active = true

				setTimeout(function() {
					console.log(event)
					console.log(event.target.parentNode.offsetParent.firstChild.firstChild.childNodes[2].firstChild)
					event.target.parentNode.offsetParent.firstChild.firstChild.childNodes[2].firstChild.focus()
					$('.card .materialize-textarea').trigger('autoresize')
					console.log('Ресайз')
				}, 10)
			},
			editTaskFocus: function(el) {
				console.log(el)
			},
			saveTask: function(index) {
				// console.log('Сохранение из элемента:')
				// console.log(el)
				this.editIndex = -1
				this.tasks[index].active = false
				this.saveToLocal()
			},
			clearForm: function(el) {
				this.new_title = ''
				this.new_descr = ''
				// console.log(el)
				this.emptyTitle_check = false
				this.focus(el)
				this.focus(el)
			},
			focus: function(el) {
				if(el.target[0]) {
					// console.log('Из clearForm по событию Сабмит')
					el = el.target[0]
					el.focus(el)
				} else if(el.target.parentNode[0]) {
					// console.log('Из clearForm по нажатию очистки')
					el = el.target.parentNode[0]
					el.focus(el)
				}
				// console.log('Фокус установлен')
				},
				clear_emptyTitle_err: function() {
					this.emptyTitle_check = false
				},
				taskViewMode: function(done) {
					switch(this.task_view_mode) {
						case 1:
							return !done
							break
						case 2:
							return done
							break
						default:
							return true
							break
					}
				},
				completeAll: function() {
						for(var i = 0; i < this.tasks.length; i++) {
							this.tasks[i].done = !this.allDone
						}
						this.allDone = !this.allDone
						this.saveToLocal()
				},
				deleteAll: function() {
					this.tasks = []
					this.saveToLocal()
				},
				saveToLocal: function() {
					var task_store = JSON.stringify(this.tasks)
					localStorage.setItem('tasks', task_store)
					console.log('saveToLocal')
				},
		},
		computed: {
			emptyTitle_err: function() {
				if(this.new_title.length == 0 && this.emptyTitle_check) {
					// console.log('emptyTitle_err = true')
					return true
				} else {
					// console.log('emptyTitle_err = false')
					return false
				}
			},
		},
		watch: {
			// tasks: function(val) {
			// 	console.log('из watch', val)
			// }
		},
		filters: {
			completedTask: function(value) {
				return false
			},
		}
	});




	$(".button-collapse").sideNav();
	$('.tooltipped').tooltip();
		$('.collapsible_').collapsible({
			onOpen: function() {
				// vm.clear_emptyTitle_err();
				// console.log('Открыта форма из моего скрипта');
				vm.emptyTitle_check = false;
				setTimeout(function() {
					// window.task_title = $('#task_title');
					// task_title.focus();
					$('#task_title').focus();
				}, 100)
			}
});
		$('.dropdown-button_').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
}
// }
// });


