let comments = [], i = 1;
let commentDate = document.getElementById('dataNew');
let commentName = document.getElementById('comment-name');
let commentBody = document.getElementById('comment-body');
let date = '';
let div = document.createElement('div');
div.innerHTML = 'Введите имя начинающиеся с заглавной буквы!!!<br> Используйте только буквы';
document.getElementById('checkboxDataNew').onclick = function () {
    if (!dataNews.hasAttribute("hidden")) {
        dataNews.hidden = 'false';
    } else {
        dataNews.hidden = '';

    }

}

commentName.onblur = function () {

    if (!commentName.checkValidity()) { 
        div.hidden = '';
        div.setAttribute("id", "error");
        commentName.after(div);
        this.classList.add("error");
    } else {
        this.classList.remove("error");
        div.hidden = 'false';

    }
};



loadComments();

document.getElementById('comment-add').onclick = function () {
    if (commentName.checkValidity()) {
        var commentDate = '';


        if (!dataNews.hasAttribute("hidden")) {
            commentDate = Math.floor(new Date(document.getElementById('dataNew').value) / 1000);
        } else {
            commentDate = Math.floor(Date.now() / 1000);
        }

        let comment = {
            name: commentName.value,
            body: commentBody.value,
            time: commentDate
        }

        commentName.value = '';
        commentBody.value = '';

        comments.push(comment);
        saveComments();
        showComments();

    }
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments() {
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function (item) {
        out += '<div class="coment"'
        out += `<p class="text-left">${item.name}<em class="text-right small"> ${timeConverter(item.time)}</em></p>`;
        out += `<div class="row  alert alert-success d-flex w-100 justify-content-between"><p class=" col-lg-10"  style="word-wrap: break-word;" role="alert">${item.body}</p>
        <button class="btn btn-link remove-button" type="button"  id="button"><img class="remove-button" style="width:20px; display: block;
        margin-left: auto;" src="./img/dustbin_120823.svg" ></button><button class="btn btn-link remove-button" type="button"  id="button">
        <img class="like" id="like" src="./img/heart_icon_142599.svg" style="width:35px;"></button></div><br></div>`;

    });
    commentField.innerHTML = out;

}

//Удаление комментария
document.addEventListener('click', function (event) {
    if (event.target.className != 'remove-button') return;

    let pane = event.target.closest('.coment');
    pane.remove('.coment');
});

//Лайк комментарию
document.addEventListener('click', function (event) {
    if (event.target.className != 'like') return;
    let likes = event.target.closest('.like');
    let src = likes.getAttribute('src');

    likes.removeAttribute('src');
    likes.setAttribute('src', "./img/heart_icon_142599_1.svg");

    if (!src.startsWith('./img/heart_icon_142599.svg')) {
        likes.removeAttribute('src');
        likes.setAttribute('src', "./img/heart_icon_142599.svg");
    }

});






function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = "";
    var nowData = new Date();
    var nowYear = nowData.getFullYear();
    var nowMonth = months[nowData.getMonth()];
    var nowDate = nowData.getDate();
    if ((year == nowYear) && (month == nowMonth) && (date == nowDate)) {
        time = 'Сегодня в ' + hour + ':' + min;
    } else if ((year == nowYear) && (month == nowMonth) && ((date + 1) == nowDate)) {
        time = 'Вчера в ' + hour + ':' + min;
    } else time = date + '.' + month + '.' + year;
    return time;
}

