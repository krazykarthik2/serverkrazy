
var pattern = new PatternLock(_('#lock'), {
    onPattern: function (e) {
        if (isNaN(e)) {
            this.clear();
        }
        else {

            _("input#password").value = 'pattern:' + Number(e).toString();
            if (_("#email").value != '') {
                if (_("#optionContainer").classList.contains('signIn')) {
                    _("#sign-in-w-pass").focus();


                } else {
                    if (_("#name").value != '') {

                        _("#sign-up").focus();

                    } else
                        _("#name").focus();
                }

            } else
                _("#email").focus();
        }
    },

    vibrate: false

});