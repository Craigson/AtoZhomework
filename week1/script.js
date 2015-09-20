

function changeImage(img) {
	var currentSource = document.getElementById("img").src;

	if (currentSource === "images/week1_1.jpg"){
		document.getElementById("img").src = img.src.replace("images/week1_1.jpg", "images/week1_2.jpg");
		
	}
	console.log(currentSource);
};

