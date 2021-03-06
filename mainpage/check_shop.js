// ログインしたユーザー
var userid = sessionStorage.getItem('userid');
console.log(userid);
// 投稿者のお店の名前とid
var shopname = sessionStorage.getItem('name');
var usersID = sessionStorage.getItem('usersID');
var photos = sessionStorage.getItem('photo');
sessionStorage.setItem('name', "");
sessionStorage.setItem('photo', "");
console.log(shopname);
console.log(usersID);
console.log(photos);

let flag = false;
const friends = firebase.firestore().collection("friend");
friends.onSnapshot(function (querySnapshot) {
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    dataArray.forEach(function (data) {
        if ((userid == data.data.usersID) && (usersID == data.data.friendID)) {
            $("#btn").html("フォロー済み");
            document.getElementById("btn").class = "id";
            flag = true;
        }
    });
});
console.log(flag);
$("#btn").on('click', function () {
    if (flag == true) {
        console.log("ok");
    } else {
        const friend = firebase.firestore().collection("friend");
        friend.add({
            friendID: usersID,
            usersID: userid,
        });
    }
});


const db = firebase.firestore().collection('shop');

if (photos != "") {
    db.where("photo", "==", photos).where("usersID", "==", usersID).onSnapshot(function (querySnapshot) {
        const dataArray = [];
        querySnapshot.docs.forEach(function (doc) {
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            dataArray.push(data);
        });
        const img = [];
        const name = [];
        const address = [];
        const urls = [];
        const budget = [];
        const comment = [];
        const genre = [];
        dataArray.forEach(function (data) {
            img.push(`${data.data.photo}`);
            name.push(`${data.data.name}`);
            address.push(`${data.data.address}`);
            urls.push(`${data.data.urls}`);
            budget.push(`${data.data.budget}`);
            comment.push(`${data.data.comment}`);
            genre.push(`${data.data.genre}`);
        });
        document.getElementById("img").src = img[0];
        $("#name").html(name[0]);
        $("#address").html(address[0]);
        $("#urls").html(urls[0]);
        $("#budget").html(budget[0]);
        $("#comment").html(comment[0]);
        $("#genre").html(genre[0]);
    });
} else {
    db.where("name", "==", shopname).where("usersID", "==", usersID).onSnapshot(function (querySnapshot) {
        const dataArray = [];
        querySnapshot.docs.forEach(function (doc) {
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            dataArray.push(data);
        });
        const img = [];
        const name = [];
        const address = [];
        const urls = [];
        const budget = [];
        const comment = [];
        const genre = [];
        dataArray.forEach(function (data) {
            img.push(`${data.data.photo}`);
            name.push(`${data.data.name}`);
            address.push(`${data.data.address}`);
            urls.push(`${data.data.urls}`);
            budget.push(`${data.data.budget}`);
            comment.push(`${data.data.comment}`);
            genre.push(`${data.data.genre}`);
        });
        document.getElementById("img").src = img[0];
        $("#name").html(name[0]);
        $("#address").html(address[0]);
        $("#urls").html(urls[0]);
        $("#budget").html(budget[0]);
        $("#comment").html(comment[0]);
        $("#genre").html(genre[0]);
    });
}

