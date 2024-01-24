import UserDao from '../daos/mongodb/user.dao.js'
const userDao = new UserDao();

export const registerResponse = (req, res, next) => {
    try {
        res.json({
            msg: "register ok",
            session: req.session,
        });
    } catch (error) {
        next(error.message);
    }
};

export const loginResponse = async (req, res, next) => {
    try {
        const id = req.session.passport.user;
        const user = await userDao.getById(id);
        const { first_name, last_name } = user;
        res.json({
            msg: "login ok",
            user: { first_name, last_name },
        });
    } catch (error) {
        next(error.message);
    }
};

export const githubResponse = async (req, res, next) => {
    try {
        const { first_name, last_name, email, isGithub } = req.user;
        res.json({
            msg: "Register/Login Github OK",
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                isGithub,
            },
        });
    } catch (error) {
        next(error.message);
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};
