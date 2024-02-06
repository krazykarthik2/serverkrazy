// for Qr code scanning  
class QrScanner {

    constructor(prevVideo, todoonresult) {
        this.onTextResult = todoonresult;
        this.prevVidEl = prevVideo;
        this.jbScanner = null;
    }

    onTextResult = () => { }
    stopScanning = () => {
        jbScanner.stopScanning();
    }
    onNoAccess = () => {

        if (this.prevVidEl)
            this.prevVidEl.remove();
    }
    onQRCodeScanned = scannedText => {
        if (scannedText == "Requested device not found") {
            this.onNoAccess();
        } else {
            this.onTextResult(scannedText);
        }
    }
    provideVideo = () => {
        var n = navigator;

        if (n.mediaDevices && n.mediaDevices.getUserMedia) {
            return n.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                },
                audio: false
            });
        } else {
            this.onNoAccess();
            return Promise.reject('Your browser does not support getUserMedia');
        }

    }
    provideVideoQQ = ( ) => {
        return navigator.mediaDevices.enumerateDevices()
            .then(function (devices) {
                var exCameras = [];
                devices.forEach(function (device) {
                    if (device.kind === 'videoinput') {
                        exCameras.push(device.deviceId)
                    }
                });

                return Promise.resolve(exCameras);
            }).then(function (ids) {
                if (ids.length === 0) {
                    if (_("video.qrPreviewVideo"))
                        _("video.qrPreviewVideo").remove();
                    return Promise.reject('Could not find a webcam');
                }

                return navigator.mediaDevices.getUserMedia({
                    video: {
                        'optional': [{
                            'sourceId': ids.length === 1 ? ids[0] : ids[1]//this way QQ browser opens the rear camera
                        }]
                    }
                });
            });
    }
    //this function will be called when JsQRScanner is ready to use
    JsQRScannerReady = () => {
        //create a new scanner passing to it a callback function that will be invoked when
        //the scanner succesfully scan a QR code
        jbScanner = new JsQRScanner(onQRCodeScanned);
        //var jbScanner = new JsQRScanner(onQRCodeScanned, provideVideo);
        //reduce the size of analyzed image to increase performance on mobile devices
        jbScanner.setSnapImageMaxSize(300);
        var scannerParentElement = _("#QrscannerArea");
        if (scannerParentElement) {

            jbScanner.appendTo(scannerParentElement);
        }
    }
    InitQr = () => {

    }
}