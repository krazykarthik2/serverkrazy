TEMPLATEfile = (data, key, mine, fileURL, HTMLforFileDel, HTMLforDel, decrypt, shareURL) => {


    return ` 
<div  class="holdingDiv ${mine} ">

    ${(data.isStoredinFB) ? HTMLforFileDel(data.sender, data.filePath, key) : HTMLforDel(data.sender, key)}


    <div    class="messageInfoDiv">

        <span class="text">${decrypt(data.message)}</span>
        <div class="file">
           
           ${HTMLforFile(data.fileType, fileURL)}
        </div>
        <span class="fileName">${data.fileName}</span>


  

        <span  class="time"  timeId="${data.time}">${simpleTime(data.time)}</span>
        <span  class='senderName'>${data.senderName}</span>
        <span  class='sender'>${data.sender}</span>

    </div >
    <div class="ProfileOfSender">
    <div class="actions">
    <button flow onclick="$('.message:not(#${key})').removeClass('action');$('#${key}').toggleClass('action')" class="icon more btnDum"></button>
        <button flow onclick="$('.message').removeClass('action');" class="icon closeAction btnDum"></button>

        <a flow class="icon download" href="${fileURL}" download="${data.fileName}"></a>

        <a flow class="icon link" target="_blank" href="${shareURL}"></a>
        ${(data.title == 'qr') ? '' : `<a flow class="icon qrlink" target="_blank" href="https://api.qrserver.com/v1/create-qr-code/?size=200&data=${shareURL}&encoding=L"></a>`}
        ${(decrypt(data.message) != '') ? `<button flow onclick="copyUtil(_('#${key} .text').innerText)" class="icon copy"></button>` : ''}

            
    </div > 
            <img class='senderPhoto' src="${fallbackutil(data.senderPhoto, 'profilepic.png')}">

    </div>
</div >


    `
}

function updateSettings() { }
TEMPLATEmsg = (messageCont, key, data, mine, decrypt, HTMLforDel, HTMLforFileDel) => {

    if (data.title == "file" || data.title == "qr") {

        if (data.filePath != '') {
            if (data.isStoredinFB == true)
                firebase.storage().ref(data.filePath).getDownloadURL().then(fileURL => {


                    messageCont.innerHTML = TEMPLATEfile(data, key, mine, fileURL, HTMLforFileDel, HTMLforDel, decrypt, (window.location.origin + window.location.pathname + '?' + processShortNotat(data.fileType) + '=' + data.filePath))

                });
            else
                messageCont.innerHTML = TEMPLATEfile(data, key, mine, data.filePath, HTMLforFileDel, HTMLforDel, decrypt, data.filePath)

        }
        else {
            let progress = Math.round((data.bytesTransferred / data.totalBytes) * 100 * 100) / 100 + '%';
            messageCont.innerHTML = `
    <div  class="holdingDiv ${mine} ">

        <div class="messageInfoDiv">

    
            <span class="text">${decrypt(data.message)}</span>
        
            <span class="progText">upload at ${progress}</span>
            <span class="progress" style="--i:${progress}">
                <span class="progBar"></span>
            </span>
            <span  class="time"  timeId="${data.time}">${simpleTime(data.time)}</span>
            <span  class='senderName'>${data.senderName}</span>
            <span  class='sender'>${data.sender}</span>

        </div>
        <div class="ProfileOfSender">
                <img class='senderPhoto' src="${fallbackutil(data.senderPhoto, 'profilepic.png')}">

        

        </div>  

    </div>

    `
        }
    } else if (data.title == "message") {
        messageCont.innerHTML = `
        <div class="holdingDiv ${mine} ">
                ${HTMLforDel(data.sender, key)}
                <div    class="messageInfoDiv">

                    <div class="textCont" style="display:flex">                    
                        <span class="text">${decrypt(data.message)}</span>
                    </div>
                    <row> 
                        <button onclick="copyUtil(_('#${key} .text').innerText)" class="icon msgcopy copy" flow></button>
                        <column>
                            <span class="time"  timeId="${data.time}">${simpleTime(data.time)}</span>
                            <span  class='senderName'>${data.senderName}</span>

                            <span class='sender'>${data.sender}</span>
                        </column>
                    </row>
                </div>
                    
                <div class="ProfileOfSender">
                        <img class='senderPhoto' src="${fallbackutil(data.senderPhoto, 'profilepic.png')}">




                </div>

        </div >

    `
    } else if (data.title == "loc") {

        messageCont.innerHTML = `<div  class="holdingDiv ${me} ">
        ${HTMLforDel(data.sender, key)}

                            <div class="messageInfoDiv">

                        
                    <span class="text">${decrypt(data.message)}</span>
                    
                    <a  href="https://www.google.com/maps/place/${data.lat},${data.lon}" target="_blank" class="locaddress"><div iconround>place</div><span>open maps</span><div iconround><span class="material-icons-outlined">
arrow_outward
</span></div></a>
                    <span class="locAccuracy">accurate up to ${Math.round(data.acc)}meters</span>

                    <span class="time"  timeId="${data.time}">${simpleTime(data.time)}</span>
                        <span  class='senderName'>${data.senderName}</span>
                    <span class='sender'>${data.sender}</span>
                    </div>
                    
                            <div class="ProfileOfSender">
                                    <img class='senderPhoto' src="${fallbackutil(data.senderPhoto, 'profilepic.png')}">



                            </div>

                    </div >

    `


    }
}
_delete = (key, dbkey) => {
    firebase.database().ref(key + '/data').child(dbkey).remove();
}
_fileDelete = (filePath, servkey, key) => {
    firebase.storage().ref("/").child(filePath).delete().then(() => {
        log("File deleted successfully");
        _delete(servkey, key);
    });
}
// function whenSignOut() {


// }
// function whenSignIn(user) {

//     // _("#DeepDsetails #isAnon").innerHTML = (user.isAnonymous) ? 'Anonymous' : 'Not Anonymous';
//     // _("#DeepDetails #EmailVer").innerHTML = (user.emailVerified) ? 'Verified' : 'Not Verified';
//     // _("#DeepDetails #providerDetails").innerHTML = '';
//     // _("#DeepDetails").classList.value = '';



//     // user.providerData.forEach(provDat => {
//     //     _("#DeepDetails").classList.value += ' ' + provDat.providerId.replaceAll('.com', '');

//     //     _("#DeepDetails #providerDetails").innerHTML +=
//     //         `< div class="dat"   >
//     //     <img class="provImg" src="${provDat.photoURL}">
//     //     <div class="provDatAcDet">
//     //         <div class="provName">${provDat.displayName}</div>
//     //         <div class="provId">${provDat.providerId}</div>
//     //         <div class="provEmail">${provDat.email}</div>
//     //         <div class="provuid">${provDat.uid}</div>
//     //     </div>`
//     //         + ((user.providerData.length != 1) ?
//     //             `<button class="unlinkprov" iconRound onclick="unlink('${provDat.providerId}')">link_off</button>` : ``)
//     //         + `</div>`;
//     // });

// }



class Server {

    constructor(fbObject, msgbucket) {
        this.server = null;
        this.serverName = null;
        this.serverOwner = null;
        this.msgbucket = msgbucket;
        this.fbobj = fbObject;
        this.paramsURL = getParams();

    }
    onServChange = () => {

    }
    handlemsg = (data, mine) => {


        let messageCont = document.createElement("div");
        messageCont.classList.value = 'message';
        messageCont.id = data.key;
        let msgData = data.val();

        TEMPLATEmsg(messageCont, data.key, msgData, mine, this.decrypt, this.HTMLforDel, this.HTMLforFileDel);

        this.msgbucket.append(messageCont);
    }
    handlemsgChange = (data, mine) => {

        let messageCont = _("#" + data.key);
        let msgData = data.val();


        TEMPLATEmsg(messageCont, data.key, msgData, mine, this.decrypt, this.HTMLforDel, this.HTMLforFileDel);
    }
    handlemsgDelete = (data, mine) => {
        DeleteMessageUI(data.key);
    }
    findFileInURL = () => {
        if (this.paramsURL['server']) {
            this.jumpToServer(this.paramsURL['server']);
            delete this.paramsURL['server'];
        }
        if (this.paramsURL['img']) {
            firebase.storage().ref(this.paramsURL['img']).getDownloadURL().then(fileURL => {
                $(document.body).append(`<section class="impNotify screen">${HTMLforFile('image', fileURL)}<a class="icon link" target="_blank" href="${window.location.origin + window.location.pathname + '?img=' + this.paramsURL['img']}"></a> </section>`)
            });

        } if (this.paramsURL['vid']) {
            firebase.storage().ref(this.paramsURL['vid']).getDownloadURL().then(fileURL => {
                $(document.body).append(`<section class="impNotify screen">${HTMLforFile('video', fileURL, '')}<a class="icon link" target="_blank" href="${window.location.origin + window.location.pathname + '?vid=' + this.paramsURL['vid']}"></a> </section>`)
            });

        } if (this.paramsURL['aud']) {
            firebase.storage().ref(this.paramsURL['aud']).getDownloadURL().then(fileURL => {
                $(document.body).append(`<section class="impNotify screen">${HTMLforFile('audio', fileURL, '')}<a class="icon link" target="_blank" href="${window.location.origin + window.location.pathname + '?aud=' + this.paramsURL['aud']}"></a> </section>`)
            });

        } if (this.paramsURL['file']) {
            firebase.storage().ref(this.paramsURL['file']).getDownloadURL().then(fileURL => {
                $(document.body).append(`<section class="impNotify screen">${HTMLforFile('', fileURL, '')}<a class="icon link" target="_blank" href="${window.location.origin + window.location.pathname + '?file=' + this.paramsURL['file']}"></a> </section>`)
            });

        }
    }

    createServer = (callback = function () { }) => {
        if (this.server != null) {
            alert('server exists');
        } else {

            if (this.fbobj.currentUser != null) {
                let createServerLoad = new Loader('createServer');
                this.serverName = getRandomString(8);
                firebase.database().ref(this.serverName).once('value').then(data => {

                    console.log("server snapshot:", data);
                    if (data.exists()) {

                        alert('server already existed. mistakenly jumped to a server ...creating a new one')
                        createServerLoad.destroy();
                        this.server = null;
                        this.serverName = null;
                        this.serverOwner = null;
                        this.onServChange();
                        this.createServer(callback);


                    } else {
                        this.server = firebase.database().ref(this.serverName);
                        this.server.child("serverDetails").push({
                            owner: this.fbobj.currentUser.uid,
                            ownerName: this.fbobj.currentUser.displayName,
                            created: timestamp()
                        });
                        createServerLoad.destroy();
                        this.serverOwner = this.fbobj.currentUser.uid;
                        this.onServChange();
                        this.setupServer();

                        callback(true);

                    }

                });


            } else {
                alert("Log in to continue....");

            }
        }
    }

    setupServer = () => {


        let serverLoad = new Loader('server');

        this.server.on('value', serverSnapShot => {
            if (!serverSnapShot.exists()) {
                // notice("#messageBucket", `server${serverSnapShot.key} was deleted... `);
                this.server = null;
                this.serverOwner = '';
                this.serverName = '';
                // notice("#messageBucket", 'left from server');
                this.onServChange();
            }

            serverLoad.destroy();
        });
        this.server.child('serverDetails').on("child_added", data => {
            this.serverOwner = data.val().owner;
            this.onServChange();
            // notice("#messageBucket", `<div id="serverQr" ><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURI(window.location.origin + window.location.pathname + '?server=' + this.server.key)}&ecc=L"/><div ><button id="ServerIdCopier" onclick="navigator.clipboard.writeText('${this.server.key}').then(()=>{_('#ServerIdCopier').classList.value='copied'; setTimeout(()=>{  _('#ServerIdCopier').classList.value=''  },1000)    })" ><div>${this.server.key}<i class="fa fa-clipboard" > </i></div><div id="copiedAlert">Copied<i class='fa fa-check'></i></div></button>${(navigator.share) ? `<button iconround onclick="navigator.share({title: 'Share ServerKrazy',text: 'Try this cool website to share data!',url: '${window.location.origin + window.location.pathname + '?server=' + this.server.key}',})">share</button>` : ''}</div></div><div>`
            //  + log(`server ${this.server.key} Created at ${new Date(data.val().created)} by ownerName:${data.val().ownerName} bearing uid:${data.val().owner}`)
            // + `</div>`);
        })



        this.server.child("data").on("child_added", data => {

            this.handlemsg(data, this.isMine(data.val().sender));

        });


        this.server.child("data").on("child_changed", data => {
            this.handlemsgChange(data, this.isMine(data.val().sender));
        });

        this.server.child("data").on("child_removed", data => { this.handlemsgDelete(data, this.isMine(data.val().sender)) });



    }
    jumpToServer = (server_shared_name, callback = function () { }) => {
        if (this.server != null) {
            alert('server exists');
            return false;
        } else {

            if (server_shared_name != '') {
                if (this.fbobj.currentUser != null) {

                    let jumpToServerLoad = new Loader('jumptoserver')

                    firebase.database().ref(server_shared_name).once('value').then(data => {

                        if (data.exists()) {
                            this.serverName = server_shared_name;

                            this.server = firebase.database().ref(server_shared_name);

                            // notice("#messageBucket", "Successfully jumped to server:" +this.serverName);
                            this.setupServer();
                            this.onServChange();

                            jumpToServerLoad.destroy();
                            callback(true);
                            return true;

                        } else {
                            alert('Server doesn`t exist');
                            jumpToServerLoad.destroy();
                            this.onServChange();

                            callback(false);

                            return false;
                        }

                    }).catch(e => {
                        jumpToServerLoad.destroy();
                        manageErrorFireBase(e);
                    });



                } else {
                    alert("log in to continue....");
                }
            }
            return false;
        }
    }


    getSnapshot(task) {

        snapshot = task.snapshot;
        log(task);
        log(snapshot);
        if (snapshot.state == "running") {

            console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100 + '%')
            getSnapshot(snapshot.task);

        }

    }
    isMine = (sender) => {

        if (sender == this.fbobj.currentUser.uid)
            return 'me';
        else return '';


    }
    sendQr = (qrContent, size) => {
        if (this.fbobj.currentUser != null) {
            if (this.server != null) {



                this.server.child("data").push({
                    title: "qr",
                    message: this.encrypt(qrContent),
                    time: timestamp(),
                    sender: this.fbobj.currentUser.uid,
                    senderName: this.fbobj.currentUser.displayName,
                    senderPhoto: this.fbobj.thumbPic,


                    fileType: 'image',
                    fileName: 'qrcode',
                    isStoredinFB: false,
                    filePath: `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURI(qrContent)}&enconding=L`,

                })
            }
        }
    }
    sendFile = (message_to_be_sent, file) => {

        if (this.fbobj.currentUser != null) {
            if (this.server != null) {



                this.server.child("data").push({
                    title: "file",
                    message: this.encrypt(message_to_be_sent),
                    time: timestamp(),
                    sender: this.fbobj.currentUser.uid,
                    senderName: this.fbobj.currentUser.displayName,
                    senderPhoto: this.fbobj.thumbPic,


                    fileType: file.type,
                    fileName: file.name,
                    isStoredinFB: true,
                    filePath: '',
                    bytesTransferred: 0,
                    totalBytes: file.size
                }).then(data => {



                    let uploadTask = firebase.storage().ref(this.fbobj.currentUser.displayName + '/' + getRandomString(5)).put(log(file));

                    uploadTask.on('state_changed',
                        progress => {
                            data.update({
                                bytesTransferred: progress.bytesTransferred
                            });

                        },
                        err => {
                            console.error(`${err}:error at uploading file`);
                        }
                    );

                    uploadTask.then(snapshot => {

                        data.update({
                            filePath: snapshot.metadata.fullPath
                        });
                        console.log(file.name + ' is uploaded...')

                    })






                });
            }
        }
    }
    sendLocation = (message_to_be_sent) => {
        if (this.fbobj.currentUser != null) {
            if (server != null) {

                getLocation(null, coords => {
                    this.server.child("data").push({
                        title: "loc",
                        message: this.encrypt(message_to_be_sent),
                        time: timestamp(),
                        sender: this.fbobj.currentUser.uid,
                        senderName: this.fbobj.currentUser.displayName,
                        senderPhoto: this.fbobj.thumbPic,

                        lat: coords.latitude,
                        lon: coords.longitude,
                        acc: coords.accuracy
                    })
                }
                )

            }
        }

    }
    getLocation = (options = null, callback = function () { }, error = function (err) { console.warn(`ERROR(${err.code}): ${err.message}`) }) => {
        if (options == null)
            options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        function success(pos) {
            const crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            callback(crd);


        }


        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    sendMessage = (message_to_be_sent) => {
        if (message_to_be_sent == '') {
            _("#messageIn").focus();
            return;
        }
        else if (message_to_be_sent.startsWith('\\\\')) {
            message_to_be_sent = eval(message_to_be_sent.substr(2));
        }
        else if (message_to_be_sent.startsWith('\\')) {
            eval(message_to_be_sent.substr(1));
            return;
        }

        if (this.fbobj.currentUser != null) {
            this.server.child("data").push({
                title: "message",
                message: this.encrypt(message_to_be_sent),
                time: timestamp(),
                sender: this.fbobj.currentUser.uid,
                senderName: this.fbobj.currentUser.displayName,
                senderPhoto: this.fbobj.thumbPic,

            })
        }


    }
    encrypt = e => { return e.toString(); }
    decrypt = e => { return e.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br/>'); }
    exitServer = (callback = function () { }) => {
        if (this.server != null) {

            this.server = null;
            callback();


        } else
            alert('already left from server');
        this.serverName = '';
        this.serverOwner = '';
        this.onServChange();
    }
    stopServer = (callback = function () { }) => {
        if (this.server != null) {
            if (this.serverOwner == this.fbobj.currentUser.uid)
                this.server.remove().then(() => { this.server = null; callback() });
            else {
                this.server = null;
                callback();
            }

        } else
            alert('already left from server');
        this.serverName = '';
        this.serverOwner = '';
        this.onServChange();

    }
    HTMLforFileDel = (sender, filePath, key) => {
        if (sender == this.fbobj.currentUser.uid)
            return `<button class="deleteBtn btnDum" onclick='_fileDelete("${filePath}","${this.server.key}","${key}");this.remove();'><i class="fa fa-trash trashIcon"></i></button>`;
        else return '';
    }
    HTMLforDel = (sender, key) => {
        if (sender == this.fbobj.currentUser.uid)
            return `<button class="deleteBtn btnDum" onclick='_delete("${this.server.key}","${key}");this.remove();'><i class="fa fa-trash trashIcon"></i></button>`;
        else return '';

    }
}

function processShortNotat(e) {
    if (e.startsWith("image")) return "img";
    else if (e.startsWith("audio")) return "aud";
    else if (e.startsWith("video")) return "vid";
    else return "file";
}
DeleteMessageUI = (key) => {
    if (_("#" + key)) {
        _("#" + key).classList.add("deleted");
        if (_("#" + key + " .text"))
            _("#" + key + " .text").innerHTML = '';
        if (_("#" + key + " a.file"))
            _("#" + key + " a.file").remove();
        setTimeout(() => { $('#' + key).animate({ height: 0 }, 100) }, 2000);
        setTimeout(() => { _("#" + key).remove(); }, 2500);
    }
}




function HTMLforFile(fileType, fileURL) {


    if (fileType.startsWith('image'))
        return `<img width=100 height=100 src=${fileURL}>`

    else if (fileType.startsWith('audio'))
        return `<div class="audioPlayer"><div class="actionCont"><button onclick="playpause(this)" class="icon btnDum playpause play "></button><div class="progress"><div class="progBar"></div><input type="range" class="rangeInput" step="1"  oninput="rangeSlider(this)"></div><audio onplay="changePlayIcon(this)" onpause="changePlayIcon(this)" onended="changePlayIcon(this);this.currentTime=0;" ontimeupdate="updateslider(this)" src=${fileURL}></audio></div><div class="timeCont"><div class="rangeValue"></div></div></div>`
    else if (fileType.startsWith('video'))
        return `<video src=${fileURL} controls></video>`

    else
        return `<iframe src="${fileURL}"></iframe>`


}

class FBmanage {

    constructor(fbconfig) { this.fbconfig = fbconfig; this.credential = null; }

    whenSignIn = (user) => { }
    whenSignOut = () => { }
    firstLogin = () => { }
    isfirstLogin = true;
    providers = () => {
        let providerList = [];
        if (this.currentUser)
            this.currentUser.providerData.forEach(prov => {
                providerList.push(prov.providerId);
            })
        return providerList;
    }
    profilePic = '';
    profPiconFB = false;
    thumbPic = '';

    updateProfPic = (callback = function () { }) => {
        if (this.currentUser.photoURL) {
            if (this.currentUser.photoURL.startsWith('https://lh3')) {

                this.profilePic = this.currentUser.photoURL;
                this.profPiconFB = false;
                callback();
            }
            else {
                this.profPiconFB = true;
                firebase.storage().ref(this.currentUser.photoURL).getDownloadURL().then(fileURL => {
                    this.profilePic = fileURL;
                    callback();
                });
            }
        }

    }
    updateProviderData = user => {
        let updateprovdatLoad = new Loader('updprovdat');


        this.currentUser = user;



        if (user == null) {
            updateprovdatLoad.destroy();
            this.profilePic = '';
            this.thumbPic = '';
            this.credential = null;
            this.token = null;
            this.whenSignOut();
        } else {
            this.updateProfPic(() => {
                getThumb(this.profilePic, 30, (res) => { this.thumbPic = res; });

                if (this.isfirstLogin) {
                    console.log('first login')
                    this.firstLogin();
                    this.isfirstLogin = false;
                }

                updateprovdatLoad.destroy();
                this.whenSignIn(user);

            })





        }
    }

    init = () => {
        firebase.initializeApp(this.fbconfig);


        firebase.auth()
            .getRedirectResult()
            .then((result) => {
                if (result.credential) {
                    this.credential = result.credential;
                    this.token = this.credential.accessToken;
                    console.log("token:" + this.token, "cred:" + this.credential);
                }
                this.updateProviderData(result.user);


            }).catch((error) => {
                manageErrorFireBase(error);
            });

        firebase.auth().onAuthStateChanged(auth_user => {
            $('button#cancel').click();//clicks all cancel buttons

            this.updateProviderData(auth_user);

        })
    }
    verifyEmail = () => {
        let verifyEmailLoad = new Loader('verifyEmail');
        this.currentUser.sendEmailVerification().then(() => {
            verifyEmailLoad.destroy();
            alert('Email has been sent to your account');
        }).catch(error => {
            verifyEmailLoad.destroy();

        })
    }
    changePassword = (newPass, oldPass, callback = function () { }) => {
        let changePasswordLoad = new Loader('changepwd');
        if (this.credential)
            this.currentUser.reauthenticateWithCredential(this.credential).then(() => {

                this.modifyPass(newPass);
                changePasswordLoad.destroy();
                callback();
            });
        else
            this.signinwpass2nd(this.currentUser.email, oldPass, () => {

                this.modifyPass(newPass);
                changePasswordLoad.destroy();
                callback();

            });

    }
    modifyPass = (newPass) => {
        let modifyPassLoad = new Loader('modifypass');
        this.currentUser.updatePassword(newPass).then(() => {
            this.updateProviderData(this.currentUser);

            modifyPassLoad.destroy();
        }).catch(error => {
            this.updateProviderData(this.currentUser);

            modifyPassLoad.destroy();
            manageErrorFireBase(error)

        })
    }
    deleteAccount = (oldPass) => {
        let delacLoad = new Loader('delac');
        if (confirm("Do you really want to delete your account???")) {

            if (this.credential)
                this.currentUser.reauthenticateWithCredential(this.credential).then(() => {
                    this.currentUser.delete();
                    delacLoad.destroy();
                });
            else
                this.signinwpass3rd(this.currentUser.email, oldPass, () => {
                    this.currentUser.delete();
                    delacLoad.destroy();


                });
        }
    }
    signinGoogle = (callback = function () { }) => {
        let signinwgoogleLoad = new Loader('signinwgoogle');
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then((result) => {
            signinwgoogleLoad.destroy();
            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);

            }
            this.updateProviderData(result.user);
            callback();

        }).catch((error) => {
            signinwgoogleLoad.destroy();
            manageErrorFireBase(error);
            if (error.code == "auth/popup-blocked") {
                firebase.auth().signInWithRedirect(provider);
                //try signing in with the redirect policy
            }


        }
        );

    }
    signinFacebook = (callback = function () { }) => {
        let signinwfacebookLoad = new Loader('signinwfacebook');
        let provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
            signinwfacebookLoad.destroy();
            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);
            }
            this.updateProviderData(result.user);

            callback();


        }).catch((error) => {
            signinwfacebookLoad.destroy();
            manageErrorFireBase(error);
            if (error.code == "auth/popup-blocked") {
                firebase.auth().signInWithRedirect(provider);
                //try signing in with the redirect policy
            }


        }
        );

    }
    signinwpass2nd = (email, password, callback = function () { }) => {
        let signinwpass2ndLoad = new Loader('sign2pass');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                signinwpass2ndLoad.destroy();
                console.log(result);
                if (result.credential) {
                    this.credential = result.credential;
                    this.token = this.credential.accessToken;
                    console.log("token:" + this.token, "cred:" + this.credential);
                }
                this.updateProviderData(result.user);
                callback();

            }).catch((error) => {
                signinwpass2ndLoad.destroy();
                manageErrorFireBase(error)
            });

    }
    signinwpass3rd = (email, password, callback = function () { }) => {
        let signinwpass3rdLoad = new Loader('sign3pass');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                signinwpass3rdLoad.destroy();
                console.log(result);
                if (result.credential) {
                    this.credential = result.credential;
                    this.token = this.credential.accessToken;
                    console.log("token:" + this.token, "cred:" + this.credential);
                }
                this.updateProviderData(result.user);

                callback();

            }).catch((error) => {
                signinwpass3rdLoad.destroy();
                manageErrorFireBase(error)
            });

    }


    signout = (callback = function () { }) => {
        let signoutLoad = new Loader('signout');
        firebase.auth().signOut().then(() => {
            signoutLoad.destroy();
            this.credential = null;
            this.token = null;
            this.updateProviderData(null);
            callback(true);
        }).catch(error => {
            signoutLoad.destroy();
            callback(false);
        });

    }
    reAuthGoogle = (callback = function () { }) => {
        let provider = new firebase.auth.GoogleAuthProvider();
        this.reAuth(provider, callback);
    }
    reAuthFacebook = (callback = function () { }) => {
        let provider = new firebase.auth.FacebookAuthProvider();
        this.reAuth(provider, callback);
    }
    reAuth = (prov, callback = function () { }) => {
        let reAuthLoad = new Loader('reAuth');

        this.currentUser.reauthenticateWithPopup(prov).then((result) => {
            reAuthLoad.destroy();
            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);
            }
            this.updateProviderData(result.user);
            callback();
        }).catch((error) => {
            reAuthLoad.destroy();
            manageErrorFireBase(error);
            if (error.code == "auth/popup-blocked") {
                firebase.auth().signInWithRedirect(provider);
                //try signing in with the redirect policy
            }


        }
        );
    }
    linkGoogle = () => {
        let linkgoogleLoad = new Loader('linkgoogle');
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
        provider.addScope('email');

        this.currentUser.linkWithPopup(provider).then((result) => {
            linkgoogleLoad.destroy();
            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);
            }

            this.updateProviderData(this.currentUser);

        }).catch((error) => {
            linkgoogleLoad.destroy();
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var errCredential = error.credential;
            console.error("code:" + errorCode, "message:" + errorMessage, "error email:" + email, "cred:" + errCredential);

            if (errorCode == "auth/popup-blocked") {
                alert('give permission for pop up and try again')
            }


        });
    }
    linkFacebook = () => {
        let linkfacebookLoad = new Loader('linkfacebook');
        let provider = new firebase.auth.FacebookAuthProvider();


        this.currentUser.linkWithPopup(provider).then((result) => {
            linkfacebookLoad.destroy();
            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);
            }
            this.updateProviderData(this.currentUser);

        }).catch((error) => {
            linkfacebookLoad.destroy();
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var errCredential = error.credential;
            console.error("code:" + errorCode, "message:" + errorMessage, "error email:" + email, "cred:" + errCredential);

            if (errorCode == "auth/popup-blocked") {
                alert('give permission for pop up and try again')
            }


        });
    }

    unlink = (provId) => {
        let unlinkload = new Loader('unlink' + provId);
        this.currentUser.unlink(provId).then(() => {
            this.updateProviderData(this.currentUser);
            unlinkload.destroy();
        })
            .catch(error => {
                unlinkload.destroy();
            })
    }

    updatePhoto = (file, callback) => {
        this.getimglink(file, dataURL => {
            this.currentUser.updateProfile({
                photoURL: dataURL
            })
            this.currentUser.reload();
            this.updateProviderData(this.currentUser);
        });
    }
    signUp = (email, password, username, files = null, callback = function () { }) => {
        if (files == null) files = [];
        if (files.length != 0) {
            //get imgbb link for the profile pic of the user
            let imgbbLoad = new Loader('imgbblinkload', true);
            this.getimglink(files[0], (dataurl) => {
                imgbbLoad.destroy();
                this.createUserWEmailAndPass(email, password, {

                    displayName: username,
                    photoURL: dataurl

                }, callback);
            }, perc => {

                imgbbLoad.updateperc(perc);

            }, error => {
                imgbbLoad.destroy();
            });

        } else {

            this.createUserWEmailAndPass(email, password, {

                displayName: username

            }, callback);

        }




    }

    getimglink = (file, callback = function () { }, loadfunc = function () { }, error = function () { }) => {

        let uploadTask = firebase.storage().ref('profPic/' + getRandomString(5)).put(log(file));

        uploadTask.on('state_changed',
            progress => {

                loadfunc(progress.bytesTransferred / progress.totalBytes * 100);


            },
            err => {
                error(err);
                console.error(`${err}:error at uploading file`);
            }
        );

        uploadTask.then(snapshot => {
            log(snapshot);

            callback(snapshot.metadata.fullPath);


            console.log(file.name + ' is uploaded...')

        })




    }

    createUserWEmailAndPass = (email, password, updateOptions, callback = function () { }) => {
        //firebase create user
        let signUpLoader = new Loader('signupbypass');

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(result => {
                signUpLoader.destroy();
                result.user.updateProfile(updateOptions).then(() => {
                    this.updateProviderData(result.user);

                    callback();
                });


            }).catch(error => {
                signUpLoader.destroy();
                manageErrorFireBase(error)

            });
    }

    signinWithPass = (email, password, callback = function () { }) => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
                if (result.credential) {
                    this.credential = result.credential;
                    this.token = this.credential.accessToken;
                    console.log("token:" + this.token, "cred:" + this.credential);
                }
                this.updateProviderData(result.user);
                callback();

            }).catch((error) => {
                manageErrorFireBase(error)



            });

    }

}

const firebaseConfig = {
    apiKey: "AIzaSyCNdLqd1Kk0gCTxWOn36pOqH5SDf0_AOpQ",
    authDomain: "serverkrazy.firebaseapp.com",
    projectId: "serverkrazy",
    storageBucket: "serverkrazy.appspot.com",
    messagingSenderId: "5605404619",
    databaseURL: "https://serverkrazy-default-rtdb.firebaseio.com/",
    appId: "1:5605404619:web:fcbe5a12c76fa98030504e",
    clientId: "5605404619-a906f2a1l0ja5raaf1642q3qtrjtvorv.apps.googleusercontent.com"

};
