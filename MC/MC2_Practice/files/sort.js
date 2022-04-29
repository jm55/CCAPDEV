/*
USED FOR TESTING SORTING FUNCTIONS
*/

// GIVEN: Create a User constructor
var User = function(name) {
	this.name = name;
	this.lname = this.name.toLowerCase();
	this.uname = this.name.toUpperCase();
	this.nav = "#nav-" + this.lname;
	this.img = "./images/user-" + name + ".png";
}

// TODO: Create object constructors as you see fit
var Post = function(title, content, date, user, postNum){
	this.title = title;
	this.content = content;
	this.date = date; //Date Obj
	this.user = user;
	this.postNum = postNum;
}

var Message = function(user, message, date){
	this.user = user;
	this.message = message;
	this.date = date;
}

list = [];

a = new User("Foo");
b = new User("Bar");

a_1 = new Post("titleA1", "postA1", new Date(2016,1,1,00,1,0), a, 1);
b_1 = new Post("titleB1", "postB1", new Date(2017,1,1,00,1,0), b, 2);
a_2 = new Post("titleA2", "postA2", new Date(2018,1,1,00,1,0), a, 3);
b_2 = new Post("titleB2", "postB2", new Date(2018,1,1,00,1,0), b, 4);
a_3 = new Post("titleA3", "postA3", new Date(2020,1,1,00,1,0), a, 5);

list = [a_2,a_1,b_2,a_3,b_1];
//console.log("===================\npre-sort");
//console.log(list);

list.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.date > b.date) ? 1 : -1) : -1 ); //date sorting
list.sort((a, b) => (a.postNum > b.postNum) ? 1 : (a.postNum === b.postNum) ? ((a.postNum > b.postNum) ? 1 : -1) : -1 ); //postNum

targetUser = a.name;
console.log(targetUser);
selectedPosts = [];
for(l of list){
    if(l.user.name == targetUser)
        selectedPosts.push(l);
}

console.log(selectedPosts);


//console.log("\n\n\n================\npost-sort");
//console.log(list);
