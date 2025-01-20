exports.createLink = async (req, res, linkService) => {
  try {
    const link = await linkService.createLink(req.user.userId, req.body.title, req.body.url);
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createLinksInBulk = async (req, res, linkService) => {
  try {
    const links = req.body;
    const createdLinks = await linkService.createLinksInBulk(req.user.userId, links);
    res.status(201).json(createdLinks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserLinks = async (req, res, linkService) => {
  try {
    const links = await linkService.getUserLinks(req.user.userId);
    res.json(links);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLinksByUsername = async (req, res, userService, linkService) => {
  try {
    const user = await userService.findByUsername(req.params.username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

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
}

exports.getLinkById = async (req, res, linkService) => {
  try {
    const linkId = req.params.id;
    const link = await linkService.getLinkById(linkId);

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
