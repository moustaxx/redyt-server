import { Response } from 'express';

export const setIsAuthCookie = (res: Response, isLoggedIn: boolean) => {
	res.cookie('logged_in', isLoggedIn, { sameSite: true, maxAge: 1000 * 60 * 60 * 24 * 14 }); //14 days
};
