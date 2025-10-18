import * as authService from "../services/auth.service.js";

/**
 * Register: create user + generate ref_code + set status=pending
 */
export async function register(req, res, next) {
  try {
    const payload = req.body;
    // service should create user and return created user (without password)
    const user = await authService.register(payload);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    next(err);
  }
}

export async function setPassword(req, res, next) {
  try {
    const { ref_code, password } = req.body;
    await authService.setPassword(ref_code, password);
    res.json({ message: "Password set. You can now login once account is approved." });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
