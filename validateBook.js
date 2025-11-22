// Sebagai validasi untuk judul dan author nya harus ada
module.exports = (req, res, next) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            status: "fail",
            message: "title dan author wajib diisi"
        });
    }

    next();
};