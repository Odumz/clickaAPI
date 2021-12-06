import multer from 'multer';

export default multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb: any) => {
        // the function should call  'cb' with a boolean
        // to indicate if the file should be accepted

        if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
            // You can always pass an error if something goes wrong:
            cb(new Error('File not support'), false);
            return;
        }
        // to accept the file pass "true", like so:
        cb(null, true);
    }
});
