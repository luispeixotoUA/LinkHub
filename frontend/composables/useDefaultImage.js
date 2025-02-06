export const useDefaultImage = () => {

  const getProfileImage = (profilePicture) => {
    return "https://api.dicebear.com/9.x/thumbs/svg?seed=" + profilePicture
  }

  return {
    getProfileImage
  }
}