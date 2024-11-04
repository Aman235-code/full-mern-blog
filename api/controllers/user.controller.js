export const test = (req, res) => {
  res.json({
    message: "Api is working",
  });
};

export const signout = (req, res, next) => {
  try {
    res.cookie("access_token").status(200).json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
