

// GIVEN: Create a User constructor
var User = function(name) {
				this.name = name;
				this.lname = this.name.toLowerCase();
				this.uname = this.name.toUpperCase();
				this.nav = "#nav-" + this.lname;
				this.img = "./images/user-" + name + ".png";
			}

// TODO: Create object constructors as you see fit




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


	// .________________________________________________________________________.
	// ||																	   ||
	// || Fill up the element behaviours below, you may change it if necessary ||
	// ||______________________________________________________________________||
	// '																	    '

	// TODO: Complete the functionality when clicking Submit Post
	$("#submit-post").click(function(e) {
		e.preventDefault();  // Prevents page refresh

		// HINT: Fill up the contents of validateFields() first
		if (validateFields(title, content)) {
			// HINT: If the number of Posts is ZERO, clear post-container first

			// Create a new post and add it to posts

			// Refresh the displayed posts
			refreshDisplay(posts);  // Fill up the contents of refreshDisplay() first

			// Reset the contents of Create Post
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
	}); 


	// .__________________________________________________________.
	// ||														 ||
	// || Fill up the functions below, you may also add your own ||
	// ||________________________________________________________||
	// '														  '

	// TODO: Complete the validateFields() function below
	function validateFields(title, content) {
		// HINT: Return 'true' if title and content is NOT empty
		// else, use the showError() function to show the proper
		// error text. Then, return false

		// If title is invalid, show errorTitle
		showError(errorTitle);

		// If content is invalid, show errorContent
		showError(errorContent);

		// If invalid, return false
		return false;

		// If valid, return true
		return true;
	}

	// TODO: Complete the sortByPostDate() function below
	function sortByPostDate() {
		// Sort posts by their Date
		
		// Refresh the displayed posts according to the result of the sorting
		refreshDisplay(sortedPosts);  // Fill up the contents of refreshDisplay() first
	}

	// TODO: Complete the sortByPostOrder() function below
	function sortByPostOrder() {
		var post, number;
		var sortedPosts = [];

		// HINT: Use splice() for inserting values to an array index

		// Refresh the displayed posts according to the result of the sorting
		refreshDisplay(sortedPosts);  // Fill up the contents of refreshDisplay() first
	}

	// TODO: Complete the applyFilter() function below
	function applyFilter(selectedValue) {
		// If, selectedValue is equal to selectNone, show all posts

		// Else, (meaning, if a name filter is selected)
		var filteredPosts = [];
		// For each post in posts, if the post name is equal to selectedValue,
		// add it to filteredPosts (filteredPosts.push(post);)
			
		// Refresh the displayed posts according to the result of filtering
		refreshDisplay(filteredPosts);  // Fill up the contents of refreshDisplay() first
		
	}

	// TODO: Complete the scrollToTop() function below
	function scrollToTop() {

	}

	// Refreshes the post-container according to the post contents of displayedPosts
	function refreshDisplay(displayedPosts) {
		// If displayedPosts is empty, show "▓▒░(°◡°)░▒▓<br>Wow such empty..."
		// in the post-container (with a "filler-text" class)

		// Else, add each post inside displayedPosts to post-container
	}
	function displayPosts(newPosts) {
		// Clear post-container and add each post inside newPosts inside it instead
	}
	function displayPost(newPost) {

		// Create elements/tags
		// HINT: You can use document.createElement("tag");

		// Add classes to your created elements so you don't have to style repeatedly
		// HINT: You can use $(element1).addClass("class-name");

		// Set the proper hierarchy of the created elements
		// HINT: $(element1).append(element2); will place element2 within element1

		// Set the proper content/values to the correct elements/tags
		// HINT: You can use $(element2).text("Text to Add"); OR $(imgElement).attr("src", "./images/user.png");

		
		// Place the outermost element (single-post-main) inside post-container
		// $("div#post-container").append(single-post-main);
	}

	// Reset the values of Create Post
	function resetCreatePost() {
		// Empty the contents of Title and Content
		// Set the Date to the current Date today
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




