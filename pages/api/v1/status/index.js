function status(req, res) {
    res.status(200).json({
        status: "acima da média chama",
    });
}

export default status;