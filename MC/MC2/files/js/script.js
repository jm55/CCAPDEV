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

var Message = function(user, message){
	this.user = user;
	this.message = message;
	this.date = new Date();
}


// GIVEN: These will store all the posts/messages locally
var posts = [];
var messages = [];  // OPTIONAL: Use this if you will implement Messenger
var postCtr = 0;

// GIVEN: Do not change the values below
var currentUser = new User("Rachel");
var errorTitle = "  Please write a title  ";
var errorContent = "  Please write a content  ";

// GIVEN: Variables to check against Filter Select (the drop-down box)
var selectNone = "None";
var selectRachel = "Rachel";
var selectJack = "Jack";
var selectAshley = "Ashley";


$(document).ready(function() {
	// GIVEN: Do not remove
	switchUser(currentUser);
	toggleFilter();  // This functionality is already GIVEN

	// TODO: Set the Create Post's date to the current date
	var today = new Date();
	// Use the given "formatDate" function present in this file to convert "today" to the correct format
	today = formatDate(today);
	resetCreatePost();

	autoFill(true);

	// .________________________________________________________________________.
	// ||																	   ||
	// || Fill up the element behaviours below, you may change it if necessary ||
	// ||______________________________________________________________________||
	// '																	    '

	// TODO: Complete the functionality when clicking Submit Post
	$("#submit-post").click(function(e) {
		e.preventDefault();  // Prevents page refresh
		
		var title = content = "";
		var datetime = document.getElementById("post-date").value;
		
		for(f of new FormData(document.forms['post-form'])){
			if(f[0] == 'post-title')
				title = f[1];
			else if(f[0] == 'post-body')
				content = f[1];
		}
		
		// HINT: Fill up the contents of validateFields() first
		if (validateFields(title, content)) {
			// HINT: If the number of Posts is ZERO, clear post-container first
			if(posts.length == 0 && $("post-container").children().length == 0)
				$("#post-container").empty();

			// Create a new post and add it to posts
			var p = new Post(title, content, strToDate(datetime), currentUser, posts.length+1);
			posts.push(p);

			// Refresh the displayed posts
			refreshDisplay(posts);  // Fill up the contents of refreshDisplay() first
			resetCreatePost();
		}
	});

	// Called when Sort by Date button is clicked
	$("div#sort-by-date").click(function(e) {
		sortByPostDate();  // Fill up the contents of sortByPostDate()
	});

	// Called when Filter button is clicked
	$("div#filter").click(function(e) {
		toggleFilter();  // This functionality is already GIVEN
	}); 

	// Called when Filter Drop-down value is changed
	$("#select-users").on('change', function (e) {
		var selectedValue =  $(this).val();
		applyFilter(selectedValue);  // Fill up the contents of applyFilter() first
	});

	// Called when Sort by Post Order button is clicked
	$("div#sort-by-order").click(function(e) {
		sortByPostOrder();  // Fill up the contents of sortByPostOrder()
	});

	// Called when To Top button is clicked
	$("div#to-top").click(function(e) {
		scrollToTop();  // Fill up the contents of scrollToTop() first
	}); 

	// NOTE: Change the function below if you want to implement Messenger
	// Called when Send Message button is clicked
	$("#send-msg").click(function(e) {
		e.preventDefault();  // Prevents page refresh
		composeMessage();
		stickDown();
	});

	//Enables Enter key as a trigger for composeMessage(). Acts the same as the one above
	//Source: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
	$("#type-msg").keyup(function(e){
		e.preventDefault();
		if(e.key === "Enter"){
			composeMessage();
			stickDown();
		}
	});

	// .__________________________________________________________.
	// ||														 ||
	// || Fill up the functions below, you may also add your own ||
	// ||________________________________________________________||
	// '														  '

	//Function for filling in data from Posts.txt and Messages.txt; FOR DEVELOPMENT PURPOSES ONLY
	function autoFill(exec){
		var fillPosts = [
			new Post("1. Where was it from again?", "“It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of light, it was the season of darkness, it was the spring of hope, it was the winter of despair.”",new Date(2021,04,08,08,00), new User("Rachel"),1),
			new Post("2. And then there were none", "“From now on, it is our task to suspect each and everyone amongst us. Forewarned is forearmed. Take no risks and be alert to danger. That is all.”", new Date(2021,03,01,10,00), new User("Jack"),2),
			new Post("3. Making Chimeras (The Resurrectionist)", "“I have butchered many men. All are innocent and equaled when they are on the table. All are exquisite and grotesque. —Dr. Spencer Black”", new Date(2021,04,20,13,00), new User("Ashley"),3),
			new Post("4. The Picture of Dorian Gray", "“The books that the world calls immoral are books that show the world its own shame.”", new Date(2020,12,25,16,00), new User("Jack"),4),
			new Post("5. The Importance of Being Earnest", "“In matters of grave importance, style, not sincerity, is the vital thing.”", new Date(2021,04,20,05,00), new User("Ashley"),5),
			new Post("6. From which movie was this again?", "“On the other hand, it’s easy to join in condemning someone once someone else has gotten the ball rolling. You don’t even have to put yourself out there; all you have to do is say, 'Me, too!'”", new Date(2020,08,03,08,38), new User("Rachel"),6),
			new Post("7. Animal Farm", "“All men are enemies. All animals are comrades.”", new Date(2021,06,17,7,30), new User("Ashley"),7)
		]

		var fillMessages = [
			new Message(new User("Rachel"), "Never gonna give you up"),
			new Message(new User("Jack"), "Never gonna let you down"),
			new Message(new User("Ashley"), "Never gonna run around and desert you"),
			new Message(new User("Rachel"), "Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you"),
			new Message(new User("Jack"), "There once was a ship that put to sea. And the name of that ship was the Billy o' Tea. The winds blew hard, her bow dipped down. Blow, me bully boys, blow (huh)"),
			new Message(new User("Ashley"), "Soon may the Wellerman come. To bring us sugar and tea and rum. One day, when the tonguing is done. We'll take our leave and go"),
		]

		if(exec){
			posts = posts.concat(fillPosts);
			displayPosts(posts);
			for(m of fillMessages) //ITERATES THROUGH SAMPLE MESSAGES
				composeMessage(m);
		}
	}

	//Displays/returns the date and time as string: "YYYY-MM-DD | hh:mm" from formatDate();
	function displayDate(date){
		return formatDate(date).replace("T"," | ");
	}

	function stickDown(){ //Reference: https://stackoverflow.com/a/270628
		console.log("stickDown");
		var msgBox = document.getElementsByClassName("msngr-body");
		msgBox.scrollTop = msgBox.scrollHeight;
	}

	//Composes and sends message if valid
	function composeMessage(message = null){
		if(message !== null){ //automated
			if(validateMessage(message.message))
				displayMessage(message);
		}else{ //manual
			var content = $("#type-msg").val();
			if(validateMessage(content)){
				var m = new Message(currentUser, content);
				sendMessage(message);
				displayMessage(m);
				clearMessage();
			}
		}		
	}

	//Pseudo-function for sending message to server
	function sendMessage(message){ 
		//DO THINGS FOR SENDING
		return true;
	}
	
	//Clears contents of message input
	function clearMessage(){
		$("#type-msg").val("");
	}
	//Creates the necessary HTML elements for message
	function displayMessage(message){
		/**FORMAT TESTING:
		 * <div class="single-msg-main">
                <div class="msg-content">Content</div>
                <div class="msg-footer">
                    <div class="msg-poster">Poster</div>
                    <div class="msg-date">Date</div>
                </div>
            </div>
		*/
		
		var msgMain = msgContent = msgFooter = msgPoster = msgDate = null;

		msgMain = document.createElement("div");
		msgContent = document.createElement("div");
		msgFooter = document.createElement("div");
		msgPoster = document.createElement("div");
		msgDate = document.createElement("div");

		$(msgMain).addClass("single-msg-main");
		$(msgContent).addClass("msg-content");
		$(msgFooter).addClass("msg-footer");
		$(msgPoster).addClass("msg-poster");
		$(msgDate).addClass("msg-date");

		$(msgFooter).append(msgPoster);
		$(msgFooter).append(msgDate);

		$(msgMain).append(msgContent);
		$(msgMain).append(msgFooter);

		$(msgContent).text(message.message);
		$(msgPoster).text(message.user.name);
		$(msgDate).text(displayDate(message.date));

		var msgBody = document.getElementsByClassName("msngr-body");
		$(msgBody).append(msgMain);
	}
	//Validate message input content
	function validateMessage(message){
		if(message.length === 0)
			return false;
		return true;
	}

	//Converts string into date object
	function strToDate(strDate){
		year = strDate.substring(0,4);
		strDate = strDate.substring(5);
		
		month = strDate.substring(0,2);
		strDate = strDate.substring(3);
		
		day = strDate.substring(0,2);
		strDate = strDate.substring(3);
		
		hr = strDate.substring(0,2);
		min = strDate.substring(3,5)
		
		return new Date(year, month, day, hr, min);
	}

	// TODO: Complete the validateFields() function below
	function validateFields(title, content) {
		// HINT: Return 'true' if title and content is NOT empty
		// else, use the showError() function to show the proper
		// error text. Then, return false

		validity = true;

		if(title.length === 0){
			validity = false;
			showError(errorTitle);
		}else if(content.length === 0){
			validity = false;
			showError(errorContent);
		}

		return validity;
	}

	/**
	 * Sort by object property
	 * Source: https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
	 * Sample: list.sort((a, b) => (a.color > b.color) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 );
	 */
	// TODO: Complete the sortByPostDate() function below
	function sortByPostDate() {
		// Sort posts by their Date
		var sortedPosts = posts.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.date > b.date) ? 1 : -1) : -1 );
		// Refresh the displayed posts according to the result of the sorting
		refreshDisplay(sortedPosts);  // Fill up the contents of refreshDisplay() first
	}

	// TODO: Complete the sortByPostOrder() function below
	function sortByPostOrder() {
		var sortedPosts = posts.sort((a, b) => (a.postNum > b.postNum) ? 1 : (a.postNum === b.postNum) ? ((a.postNum > b.postNum) ? 1 : -1) : -1 );
		// Refresh the displayed posts according to the result of the sorting
		refreshDisplay(sortedPosts);  // Fill up the contents of refreshDisplay() first
	}

	// TODO: Complete the applyFilter() function below
	function applyFilter(selectedValue) {
		var filteredPosts = [];

		// If, selectedValue is equal to selectNone, show all posts
		if(selectedValue == "None"){
			refreshDisplay(posts);  // Fill up the contents of refreshDisplay() first
		}else{
			for(p of posts)
				if(p.user.name===selectedValue)
					filteredPosts.push(p);
			refreshDisplay(filteredPosts);
		}	
	}

	// TODO: Complete the scrollToTop() function below
	function scrollToTop() {
		window.scrollTo(0,0); //Reference: https://www.w3schools.com/jsref/met_win_scrollto.asp
	}

	//Wow, such empty
	function suchEmpty(){
		$("#post-container").empty();
		var doggo = "<p class='filler-text'>▓▒░(°◡°)░▒▓<br>Wow such empty...</p>"
		$("#post-container").append(doggo);
	}

	// Refreshes the post-container according to the post contents of displayedPosts
	function refreshDisplay(displayedPosts) {
		// If displayedPosts is empty, show "▓▒░(°◡°)░▒▓<br>Wow such empty..."
		// in the post-container (with a "filler-text" class)
		if(displayedPosts.length == 0 && $("post-container").children().length == 0)
			suchEmpty();
		else
			displayPosts(displayedPosts);
	}
	function displayPosts(newPosts) {
		// Clear post-container and add each post inside newPosts inside it instead
		$("#post-container").empty();
		for(n of newPosts)
			displayPost(n);
	}
	function displayPost(newPost) {
		/**
		 * FORMAT TESTING
		 * 
		 * <div class="single-post-main"> spMain
                <div class="single-post"> sp
                    <div class="sp-left"> spLeft
                        <img class="sp-picture" src="./images/user-ashley.png" alt="sp-picture"/> spImg
                    </div>
                    <div class="sp-right"> spRight
                        <div class="sp-right-content"> spRightContent
                            <div class="sp-title">sp-title</div> spTitle
                            <div class="sp-body">sp-body</div> spBody
                        </div>
                        <div class="sp-right-bottom"> spRightBottom
                            <div class="sp-name">name</div> spName
                            <div class="sp-date">date</div> spDate
                        </div>
                    </div>
                </div>
            </div>
		 */

		var spMain = sp = spLeft = spImg = spRight = spRightContent = spTitle = spBody = spRightBottom = spName = spDate = null;

		// Create elements/tags
		spMain = document.createElement("div");
		sp = document.createElement("div");
		spLeft = document.createElement("div");
		spRight = document.createElement("div");
		spRightContent = document.createElement("div");
		spTitle = document.createElement("div");
		spBody = document.createElement("div");
		spRightBottom = document.createElement("div");
		spName = document.createElement("div");
		spDate = document.createElement("div");
		spImg = document.createElement("img");

		// Add classes to your created elements so you don't have to style repeatedly
		$(spMain).addClass("single-post-main");
		$(sp).addClass("single-post");
			$(spLeft).addClass("sp-left");
				$(spImg).addClass("sp-picture"); //IMG
			$(spRight).addClass("sp-right");
				$(spRightContent).addClass("sp-right-content");
					$(spTitle).addClass("sp-title"); //TEXT
					$(spBody).addClass("sp-body"); //TEXT
				$(spRightBottom).addClass("sp-right-bottom");
					$(spName).addClass("sp-name"); //TEXT
					$(spDate).addClass("sp-date"); //TEXT/DATE
		
		// Set the proper hierarchy of the created elements
		$(spRightBottom).append(spName);
		$(spRightBottom).append(spDate);

		$(spRightContent).append(spTitle);
		$(spRightContent).append(spBody);

		$(spRight).append(spRightContent);
		$(spRight).append(spRightBottom);

		$(spLeft).append(spImg);
		
		$(sp).append(spLeft);
		$(sp).append(spRight);

		$(spMain).append(sp);

		// Set the proper content/values to the correct elements/tags
		$(spName).text(newPost.user.name);
		$(spTitle).text(newPost.title);
		$(spBody).text(newPost.content);
		$(spDate).text(displayDate(newPost.date));
		$(spImg).attr("src", newPost.user.img);
		
		// Place the outermost element (single-post-main) inside post-container
		$("div#post-container").append(spMain);
	}

	// Reset the values of Create Post
	function resetCreatePost() {
		for(f of new FormData(document.forms['post-form']))
			$("#" + f[0]).val("");
		$("#post-date").val(formatDate(new Date())); 
	}

	// ._____________________________________.
	// ||									||
	// || Do not change the functions below ||
	// ||___________________________________||
	// '									 '
	function formatDate(today) {  // GIVEN: For date formatting
		var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0) + 'T' + today.getHours().toString().padStart(2, 0) + ':' + today.getMinutes().toString().padStart(2, 0);
		return formattedDate;
	}
	$("input#post-title").click(function(e) {  // GIVEN: For error handling
		hideError();
	});
	$("textarea#post-body").click(function(e) {
		hideError();
	});
	function hideError() {
		$("#post-error").text("");
	}
	function showError(errorText) {
		$("#post-error").text("");
		$("#post-error").append("      [ERROR]    " + "<span>" + errorText + "</span>" + "    !     ");
	}
	$("#nav-rachel").click(function(e) {  // GIVEN: For user switching
		var user = new User("Rachel");
		switchUser(user);
	});
	$("#nav-jack").click(function(e) {
		var user = new User("Jack");
		switchUser(user);
	});
	$("#nav-ashley").click(function(e) {
		var user = new User("Ashley");
		switchUser(user);
	});	
	function switchUser(newUser) {
		showAllUsers();
		$("#nav-current-name").text(newUser.name);
		$("#nav-selected").attr("src", newUser.img);
		showAllUsers();
		$(newUser.nav).hide();
		currentUser = newUser;
	}
	function showAllUsers() {
		$("#nav-rachel").show();
		$("#nav-jack").show();
		$("#nav-ashley").show();
	}
	function toggleFilter() {
		$("#select-users").toggle();
		if ($("#select-users").is(":visible")){
			var selectedFilter = $("#select-users").val();
			applyFilter(selectedFilter);
		}
		else {
			refreshDisplay(posts);
		}
	}
});




