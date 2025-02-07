exports.updateProfile = async (req, res, userService) => {
  try {
    const { displayName, profilePicture, theme, url } = req.body;

    if (url) {
      const existingUser = await userService.findByUrl(url);
      if (existingUser && existingUser.id !== req.user.userId) {
        throw new Error('URL already taken');
      }
    }

    const updatedUser = await userService.updateProfile(req.user.userId, {
      displayName,
      profilePicture,
      theme,
      url,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPrivateProfile = async (req, res, userService) => {
  try {
    const user = await userService.findById(req.user.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getAllUsers = async (req, res, userService) => {
  console.log("passa aqui");
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPublicProfile = async (req, res, userService, linkService) => {
  try {
    const user = await userService.findByUrl(req.params.url);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const links = await linkService.getUserLinks(user.id);
    res.json({
      username: user.username,
      displayName: user.displayName,
      profilePicture: user.profilePicture,
      theme: user.theme,
      links,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


};
