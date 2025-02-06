exports.register = async (req, res, userService, authService) => {
  try {
    const { username, password } = req.body;
 
    if (!username.match(/^[a-zA-Z0-9._-]+$/)) {
      throw new Error('Username can only contain letters, numbers, underscores, dots and hyphens');
    }
 
    const existingUser = await userService.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already taken');
    }
 
    const user = await authService.register({
      username: username.toLowerCase(),
      password,
      displayName: username,
      url: username.toLowerCase(),
    });
 
    res.status(201).json({
      username: user.username,
      url: user.url
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
 };
 
 exports.login = async (req, res, authService) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username.toLowerCase(), password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
 };