import LogoText from '@/app/(dashboard)/components/Navbar/LogoText'
import Menu from '@/app/(dashboard)/components/Navbar/Menu'
import ThemeSelection from '@/app/(dashboard)/components/Navbar/ThemeSelection'
import ProfileSection from '@/app/(dashboard)/components/Navbar/ProfileSection'

const Navbar = () => (
  <div className='navbar border-b-2 bg-base-100'>
    <LogoText />
    <Menu />
    <div className='navbar-end'>
      <ThemeSelection />
      <ProfileSection />
    </div>
  </div>
)

export default Navbar
