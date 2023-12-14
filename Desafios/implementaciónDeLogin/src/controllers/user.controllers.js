import UserDao from '../daos/mongodb/user.dao.js'
const userDao = new UserDao();

export const registerUser = async (req, res) => {
    try {
        const newUser = await userDao.registerUser(req.body);
        if (newUser) {
            res.redirect('/login');
        } else {
            res.redirect('/error-register');
        }
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.loginUser(email, password);

        if (user) {
            req.session.email = email;
            req.session.password = password;
            res.redirect('/profile');
        } else {
            res.redirect('/error-login');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error-login');
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};
