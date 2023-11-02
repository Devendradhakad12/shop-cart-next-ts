 import { tokenValue } from '@/lib/token'
import Profile from './_components/profile'

const ProfilePage = () => {
    const token = tokenValue()
    return (
      <Profile token={token || ""} />
    )
}

export default ProfilePage
