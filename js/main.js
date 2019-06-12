var button = $("#button");
var list = $("#list");
var input = $("#input")

$(list).on("click", function(event){
	if(event.target.tagName === "LI") {
		$(event.target).toggleClass("checked");
	}

	if(event.target.tagName === "SPAN") {
		var liElement = $(event.target).parent();
		liElement.hide(1000);
		setTimeout(function() {
			liElement.remove();
		},800);
	}
});

$.ajax("./json/main.json").done(function(tasks){
	for(let i = 0; i < tasks.length; i++) {
		addElement( ` ${tasks[i].id} : ${tasks[i].text} ( ${tasks[i].data} ) `);
	}
})
.fail(function(error) {
    document.write(`${error.status} : ${error.statusText}`);
  });

function newElement() {
	addElement($("#input").val());
}

function addElement(text) {
	var li = $("<li></li>").addClass('list_item');
	var span = $("<span></span>").addClass('list_item_delete');

	if(text === "") {
		$(".container").addClass('list-error');
		setTimeout(function(){
			$(".container").removeClass('list-error');
		}, 600);
		return;
	}
	
	list.append(li);
	li.html(text);
	li.append(span);
}
$(input).keydown(function(event){
	if(event.keyCode === 13) {
		newElement();
	}	
});

$(button).on("click", function(event){
	newElement();
});
