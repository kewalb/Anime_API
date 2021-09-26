//div to hold search field and search button
div_1 = document.createElement("div");
div_1.className = "text-center container";
//label for search field
label = document.createElement("label");
label.className = "form-label m-3";
label.innerHTML = "Anime Name"
//input field to enter anime name
input = document.createElement("input");
input.type = "text"
input.className = "form-control";
input.id = "anime_name";
input.placeholder = "Please enter a anime you want to search";
//search button
button_search = document.createElement("button");
button_search.type = "button"
button_search.className = "btn btn-success m-3";
button_search.innerHTML = "Search"
button_search.id = "search"
//appending created element to the body
div_1.appendChild(label);
div_1.appendChild(input);
div_1.appendChild(button_search)
document.body.appendChild(div_1)
//globally creating second div for clearing purpose
div_2 = document.createElement("div");
div_2.className = "container my-4";

//fetching search data from api
document.getElementById("search").addEventListener("click", async () => {
    value = document.getElementById("anime_name").value
    try{
    url = `https://api.jikan.moe/v3/search/anime?q=${value}&limit=5`;
    const response = await fetch(url)
    const data = await response.json();
    
    //clearing the input and result values
    document.getElementById("anime_name").value = ""
    div_2.innerHTML = ""

    //checking the status of HttpRequest and returning a alert if status code is 404
    if(response.status == 200)
        displayData(data)
    else
        alert("no anime found")
}
    catch(err){
           alert(err.message)
    }
})

//function to display information of anime by creating HTML elements using DOM
displayData = (data) => {
   
    div_3 = document.createElement("div")
    div_3.className = "row mb-3"

    //column for poster image
    div_4 = document.createElement('div')
    div_4.className = "col col-lg-3 col-md-2 col-sm-3 col-xs-2"

    //creating img tag for anime poster
    image = document.createElement('img')
    image.src = data.results[0].image_url
    image.alt = "No image found"
    image.className = "img-fluid"

    //creating div tag with col className for details related to anime
    div_5 = document.createElement('div')
    div_5.className = "col col-lg-9 col-md-10 col-sm-9 col-xs-10"

    //creating individual rows for each detail required
    div_6 = document.createElement("div")
    div_6.className = "row  "
    div_7 = document.createElement("div")
    div_7.className = "row"
    div_8 = document.createElement("div")
    div_8.className = "row"
    div_9 = document.createElement("div")
    div_9.className = "row"
    div_10 = document.createElement("div")
    div_10.className = "row"
    div_11 = document.createElement("div")
    div_11.className = "row"

    //adding data from response given after fetching from API 
    div_6.innerHTML = `<strong>Title</strong>: ${data.results[0].title}`
    div_7.innerHTML = `<strong>Description</strong> ${data.results[0].synopsis}`
    div_8.innerHTML = `<strong>Start-date</strong>: ${data.results[0].start_date}`
    div_9.innerHTML = `<strong>End-date</strong>: ${data.results[0].end_date}`
    div_10.innerHTML = `<strong>Type</strong>: ${data.results[0].type}`
    div_11.innerHTML = `<strong>Rated</strong>: ${data.results[0].rated}` 

    //appending all the rows to the second column
    div_5.appendChild(div_6)
    div_5.appendChild(div_7)
    div_5.appendChild(div_8)
    div_5.appendChild(div_9)
    div_5.appendChild(div_10)
    div_5.appendChild(div_11)

    //final append to container and then to body tag
    div_4.appendChild(image)
    div_3.appendChild(div_4)
    div_3.appendChild(div_5)
    div_2.appendChild(div_3)
    document.body.appendChild(div_2)
}
