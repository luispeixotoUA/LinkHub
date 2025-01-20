exports.register = async (req, res, userService, authService) => {
  try {
    const { username, password } = req.body;

    console.log('Entrou no controller');

    const existingUser = await userService.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already taken');
    }

    const user = await authService.register({
      username,
      password,
      displayName: username,
      url: username,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.login = async (req, res, authService) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
