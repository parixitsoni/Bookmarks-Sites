//Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);
function saveBookmark(e){
    e.preventDefault();

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

 if(!validateForm(siteName,siteUrl)){
     return false; 
 }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    

    if(localStorage.getItem('bookmarks') === null){
        //Initialize array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to loacalStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else{
        //Get Bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmarks to array
        bookmarks.push(bookmark);
        //Re-set back to LocalStroage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();

    fetchBookmarks(); 

    e.preventDefault();
}

//delete bookmarks 
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResult = document.getElementById('bookmarksResults'); 

    for(var i=0; i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchBookmarks(); 

}



//fetch bookmarks
function fetchBookmarks(){
    //Get bookmarks from LocalStroage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Get output by id
    var bookmarksResult = document.getElementById('bookmarksResults'); 

    //Build output
    bookmarksResult.innerHTML = '';
    for(var i = 0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResult.innerHTML += '<div class="card card-body">'+
                                        '<h3>'+name+
                                        '<a class="btn btn-success m-2" style="float:right" target="_blank" href="'+url+'">Visit</a>'+
                                        '<a onClick="deleteBookmark(\''+url+'\')" style="float:right" class="btn btn-danger m-2" href="#">Delete</a>'+
                                        '</h3>'+
                                     '</div>';
    }
} 

function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    return true;
}