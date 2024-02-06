
//global usage utilites
navigator.getBattery().then(e => {
    e.onlevelchange = updateBattery;
    e.onchargingchange = updateBattery;
    updateBattery(e);
})
var battery = { level: 100, isCharging: false, chargingTime: 0, dischargingTime: 0 }
function updateBattery(e) {
    battery.level = e.level * 100;

    battery.isCharging = e.charging;
    battery.chargingTime = e.chargingTime;
    battery.dischargingTime = e.dischargingTime;
}
var settings = { timeStyle: 12, dateStyle: 1, dtseperator: '/', monthStyle: 'small' };
copyUtil = (...Args) => {
    var arg = '';
    Args.forEach(argument => {
        arg += argument;
    })
    navigator.clipboard.writeText(arg).then(alert('copied'));
}
function calculatelinebreaks(e) {
    return e.split('\n').length - 1
}
let isMapsLoaded = false;
function initMap() { isMapsLoaded = true };
function log(...[val]) {
    console.log(val);
    return val;
}
function sysenq(f) {
    setTimeout(f, 1);
}
function _(selector) {
    return document.querySelector(selector);
}
function _All(selector) {
    return document.querySelectorAll(selector);
}
function hms(va) {
    var sec_num = parseInt(va, 10);
    // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return (hours != 0 ? hours + ':' : '') + (minutes != 0 ? minutes + ':' : '') + seconds;
}
function rangeSlider(slider) {
    var audio = slider.parentNode.parentNode.querySelector('audio');
    var button = audio.parentNode.querySelector("button");
    audio.currentTime = slider.value;
    updateslider(audio);
    changePlayIcon(audio);
}
function updateslider(audio) {
    audio.parentNode.parentNode.querySelector('.rangeValue').innerHTML = hms(audio.currentTime) + " / " + hms(audio.duration);
    audio.parentNode.parentNode.style = `--i:${(audio.currentTime / audio.duration) * 100}%`;

}
function changePlayIcon(audio) {

    var button = audio.parentNode.querySelector("button");
    if (audio.paused)
        button.classList.add("play");
    else {
        if (button.classList.contains("play"))
            button.classList.remove("play");
    }

}
function toggleplaypause(audio, button) {

    audio.parentNode.querySelector('.rangeInput').max = audio.duration;
    if (!audio.paused) {
        audio.pause();
    } else {
        document.querySelectorAll("audio").forEach((e) => {
            if (!e.paused)
                e.pause()
        }
        );
        audio.play();
    }

}
function playpause(button) {
    audio = button.parentNode.querySelector("audio");
    toggleplaypause(audio, button);

}

function notice(area, notice_alert) {
    let notice_block = document.createElement('div');
    notice_block.classList.value = 'notice_block';
    notice_block.innerHTML = notice_alert;
    $(area).append(notice_block);
}

function hidePass(passinput, icon = null) {
    if (icon == null)
        if (passinput.nextElementSibling != null)
            icon = passinput.nextElementSibling.children[0];
    passinput.type = 'password';
    if (icon != null)
        icon.classList.value = 'fa fa-eye';
}
function showHidePass(passinput, icon = null) {
    if (passinput.type == 'password') {
        passinput.type = 'text';
        if (icon)
            icon.classList.value = 'fa fa-eye-slash';
    }
    else {
        passinput.type = 'password';
        if (icon)
            icon.classList.value = 'fa fa-eye';

    }
}

function processForParams(hypertext) {
    var idx = hypertext.indexOf('?');
    var params = new Array();
    if (idx != -1) {
        var pairs = hypertext.substring(idx + 1, hypertext.length).split('&');
        for (var i = 0; i < pairs.length; i++) {
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = unescape(nameVal[1]);
        }
    }
    return params;
}
function getParams() {
    return processForParams(document.URL);
}
function manageErrorFireBase(error) {

    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var errCredential = error.credential;
    console.error("code:" + errorCode, "message:" + errorMessage, "error email:" + email, "cred:" + errCredential);

    switch (errorCode) {
        case "auth/email-already-in-use":
            _("#YouAlrRegistered").classList.value = 'visible';
            break;
        case "auth/wrong-password":
            _("#wrongPassword3rd").classList.value = 'visible';
            break;
        case "auth/too-many-requests":
            alert('too  many requests account has been temporarily disabled...')
            break;
        case "auth/user-not-found":
            _("#userNotFound").classList.value = 'visible';
            break;
        case "auth/invalid-email":
            _("#invalidEmail").classList.value = 'visible';
            break;
        case "auth/user-mismatch":
            alert('User mis matched.Use same account');
            break;

    }
}
function getThumb(link,size,callback=function(){}){
    img= document.createElement('img');
    img.crossOrigin='anonymous';
    img.addEventListener('load',()=>{
        canv= document.createElement('canvas');
        canv.width=canv.height=size;
        ctx= canv.getContext('2d');
        ctx.drawImage(img,0,0,size,size);
        callback( canv.toDataURL());
    })
    img.src=link;
}
///////////////////////////
function auto_height(elem) {  
    elem.style.height = "1px";
    elem.style.height = (elem.scrollHeight)+"px";
}

function getRandomString(length) {
    return Math.random().toString(36).slice(2, 2 + length);
}
function fallbackutil(real,fallback){
    return (real==null||real==undefined||real=='')?fallback:real;
}
function timestamp() {
    let date_now_ms = new Date();
    return date_now_ms.valueOf();
}
function Month(num) {
    if (settings.monthStyle == "num") return num + 1;
    else if (settings.monthStyle == "small") return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][num];
    else if (settings.monthStyle == "full") return ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][num]
}

function dateSpec(dt, now) {

    diff = Math.round(Math.abs(((new Date(now.getFullYear(), now.getMonth(), now.getDate())) - (new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()))) / (24 * 60 * 60 * 1000)));
    isTooSimple =(settings.monthStyle != 'num' && dt.getFullYear() == now.getFullYear());
    seperator = (isTooSimple) ? ' ' : settings.dtseperator;
    year =(isTooSimple)? '':dt.getFullYear();

    if (diff == 0) return '';
    else if (diff == 1) return 'Yesterday'
    else if (settings.dateStyle == 1)
        return `${dt.getDate()}${seperator}${Month(dt.getMonth())}${seperator}${year}`
    else if (settings.dateStyle == 2)
        return `${Month(dt.getMonth())}${seperator}${dt.getDate()}${seperator}${year}`
    else if (settings.dateStyle == 3)
        return `${year} ${Month(dt.getMonth())}${seperator}${dt.getDate()}`


}
function simpleTime(date_val = timestamp()) {
    dt = new Date(date_val);
    now = new Date();

    str = `<div class="dateSpec">
        ${dateSpec(dt, now)}
    
        </div>`
    if (settings.timeStyle == 12)
        str += `<div class="timeSpec">${dt.getHours() == 12 ? 12 : dt.getHours() % 12}:${dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()}${dt.getHours < 11 ? 'am' : 'pm'}</div>`;
    else
        str += `<div class="timeSpec">${dt.getHours()}:${dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()}</div>`;
    if ((((now.getTime() - dt.getTime()) / 1000) / 60) < 1)
        str = '<div class="timeSpec">just now</div>';

    return str;
}



function fullyHide(el) {
    disable(el);
    el.hidden = true;

}
function fullyHideUnit(el) {
    disableUnit(el);
    el.hidden = true;


}
function fullyShow(el) {
    enable(el);
    el.hidden = false;

}
function fullyShowUnit(el) {
    enableUnit(el);
    el.hidden = false;
}

function disable(el) {
    if (el.length) {
        el.forEach(ele => ele.disabled = true)
    } else
        el.disabled = true;

}
function enable(el) {
    if (el.length) {
        el.forEach(ele => ele.disabled = false)
    } else
        el.disabled = false;

}
function enableUnit(sectionEl) {

    sectionEl.querySelectorAll("input").forEach(enable);
    sectionEl.querySelectorAll("button").forEach(enable);
    sectionEl.querySelectorAll("a").forEach(enable);
}
function disableUnit(sectionEl) {
    sectionEl.querySelectorAll("input").forEach(disable);
    sectionEl.querySelectorAll("button").forEach(disable);
    sectionEl.querySelectorAll("a").forEach(disable);

}
function collapseExpand(el) {
    if (el.attributes.collapsed == null || el.attributes.collapsed.value == 'false')
        collapse(el);
    else
        expand(el);
}
function collapse(el) {
    $('button#cancel', el).click();//clicks all button#cancel..  which are descendent of el in jqueryy

    enableUnit(_('section.screen#screen2'));
    enableUnit(_('section.screen#screen3'));

    el.setAttribute('collapsed', true);
}

function expand(el) {
    disableUnit(_('section.screen#screen2'));
    disableUnit(_('section.screen#screen3'));

    el.setAttribute('collapsed', false);
}


class Loader {
    constructor(name = getRandomString(5), isNumeral = false) {
        this.lname = name;
        this.loadel = document.createElement('div');
        this.loadel.classList.value = isNumeral ? 'percloader' : 'loader';
        this.loadel.id = name;
        this.loadel.innerHTML = isNumeral ? '<div class="loadIndicCont"><div class="loadIndic" style="background:#000"></div><div class="loadIndic"></div></div><div id="percentage"><span></span></div></div>' : '<div></div><div></div><div></div>';
        _('body').setAttribute('loading', this.lname);
        _('body').append(this.loadel);

    }
    updateperc = function (perc) {
        if (this.loadel) {
            this.loadel.style = '--i:' + perc;
            this.loadel.querySelector('#percentage').classList.add('active');
            this.loadel.querySelector('#percentage span').innerText = perc;
            return this;
        }
    }
    destroy = function () {
        _('body').removeAttribute('loading');
        this.loadel.remove();

        return this;

    } 
}
